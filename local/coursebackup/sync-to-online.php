<?php
require_once("./config.php");

define("SYNC_OPERATIONS", array("SEND"=>0, "RECEIVE"=>1));




class sync_course{
    
    function __construct()
    {
        $url = new moodle_url($_SERVER["REQUEST_URI"]);
        $course_id = (int) $url->get_param("course_id");
       
        if(!$course_id){
            echo("No course Id");
            return;
        }
     
        $this->course_id = $course_id;
        

        $remoteModules = $this->get_remote_course_modules($course_id);
        $localModules = $this->get_course_modules($course_id);

        $course_modules = $this->get_remote_course_module_id((array)$localModules, (array)$remoteModules);
        
        
        $fResult = array();
        foreach ($course_modules as $activity) {
            
            $gradesData = $this->get_activity_grades_data($activity);
           

            if(count( $gradesData)){
                $requestData = array_merge(WEB_SERVICE_REQUEST_OPTIONS, $gradesData);
                // echo( json_encode($requestData["courseid"]));
                // echo( json_encode($requestData));
                // echo("---------------");
                $fResult[] = $this->send_backup($requestData);
            }
            
        }

        header("Content-Type: application/json");
        echo(json_encode(array("result"=>$fResult)));
        
    }
    function get_local_users($course_id){
        global $DB;
        $query = "SELECT 
        {user}.id,
        {user}.firstname,
        {user}.lastname,
        {user}.username,
        {user}.email,
        {course}.id AS courseid,
        {course}.fullname
        
    FROM
        {enrol}
            INNER JOIN
        {user_enrolments} ON {enrol}.id = {user_enrolments}.enrolid
            INNER JOIN
        {user} ON {user_enrolments}.userid = {user}.id
            INNER JOIN
        {course} ON {enrol}.courseid = {course}.id
    WHERE
        courseid = :course_id";

    $records = $DB->get_records_sql($query, array("course_id"=>$course_id) );
    return $records;

    }
    function get_remote_users($course_id){
        $REMOTE_SERVER = $this->get_remote_server();
        $data = array_merge(WEB_SERVICE_REQUEST_USERS_OPTIONS, array("courseid"=>$course_id));
        $url = "$REMOTE_SERVER/webservice/rest/server.php";
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => $this->array_to_url_params($data)
            )
        );

        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        if ($result === FALSE) { 
            /* Handle error */ 
            return [];
        }
        $records = json_decode($result);
        $data = array();
        foreach ($records as $record) {
            $data[$record->email] = $record;
        }

        return $data;

    }
    function get_activity_grades_data($activity){
        $grades = $this->get_grade_items($activity->course, $activity->name, $activity->instance);
        // $grades = $this->get_grade_items($activity->course, "quiz", $activity->instance);
        // echo(json_encode($activity));
        $remote_users = $this->get_remote_users($this->course_id);
        $local_users = $this->get_local_users($this->course_id);
        $gradesData = array();
        $numberOfGrades = 0;
        foreach ($grades as $grade) {
            $local_user = $local_users[$grade->userid];
            $remote_user = $remote_users[$local_user->email];
            if($remote_user->id !== null){
                $gradeData =  array(
                    "source" =>  $activity->name,
                    "courseid" => $grade->courseid,
                    "component" => "mod_$activity->name",
                    "itemnumber" => 0,
                    "activityid" => $activity->remoteModuleId,
                    "grades[$numberOfGrades][studentid]" => $remote_user->id,
                    "grades[$numberOfGrades][grade]" => $grade->rawgrade
                  );
            }
            

            
            $gradesData = array_merge($gradesData, $gradeData);
            $numberOfGrades++;
        }

        return $gradesData;

    }
    function get_grade_items($course_id, $item_module, $instance_id){
        global $DB;

        $query = "SELECT {grade_grades}.id, {grade_grades}.userid, {grade_grades}.rawgrade, {grade_items}.id as itemid, {grade_items}.itemtype, {grade_items}.itemmodule, {grade_items}.courseid, {grade_items}.iteminstance FROM {grade_grades} inner join {grade_items} on {grade_grades}.itemid = {grade_items}.id where courseid=:course_id and {grade_items}.iteminstance=:instance_id and {grade_items}.itemmodule=:item_module and rawgrade >=0";
        $courseGrade = $DB->get_records_sql($query, array("course_id"=>(int)$course_id, "instance_id"=>(int)$instance_id, "item_module" => $item_module));
       return $courseGrade;
    }
    function get_remote_course_module_id($localModules, $remoteModules){
        for ($i=0; $i < count($remoteModules); $i++) { //
            $module = $localModules[$i];//
            $remoteModule = $remoteModules[$i];///
            $module->remoteModuleId = $remoteModule->id;
            $localModules[$i] = $module;//
        }
        
        return $localModules;//

    }
    function get_course_modules($course_id){
        global $DB;
        $query = "SELECT {course_modules}.id, {course_modules}.course, {course_modules}.module, {course_modules}.instance, {modules}.name FROM {course_modules} inner join {modules} on {course_modules}.module = {modules}.id where {course_modules}.course=:course_id";
        $courseModules = $DB->get_records_sql($query, array("course_id"=>$course_id));
        $arrayOfCourseModules = array();
        foreach($courseModules as $module){
            $arrayOfCourseModules[] = $module;
        }
        return $arrayOfCourseModules;

    }
    function get_remote_course_modules($course_id){
        $REMOTE_SERVER = $this->get_remote_server();
        $url = "$REMOTE_SERVER/local/coursebackup/get-course-modules.php?course_id=$course_id";
        $result = file_get_contents($url);
        return json_decode($result)->data;

    }
    function array_to_url_params($a){
        $s = "";
        foreach($a as $k => $v){
            $s .= "$k=$v&";
        }
        return trim($s, "&");
    }
    
    function send_backup($data){
        
        $REMOTE_SERVER = $this->get_remote_server();
        $url = "$REMOTE_SERVER/webservice/rest/server.php";
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => $this->array_to_url_params($data)
            )
        );
        
        $context  = stream_context_create($options);
        $result = json_decode(file_get_contents($url, false, $context));
        if ($result === FALSE) { 
            /* Handle error */ 
            echo("We got an error");
            return;
        }
        if($result !== 0){
            return array("result"=>$result, "success"=>false);
    
        }

        return array("result"=>$result, "status"=> 200, "success"=>true);
        
    }
    

    function receive_backup(){
        global $DB;
        static $QUIZ_ATTEMPT_TABLE = "quiz_attempts";

        $data = json_decode(file_get_contents('php://input'));
        $quiz = (array)$data->quiz;
        $quiz_array = [];

        $existingQuiz = $this->get_course_quiz_info($this->course_id);
        $existingQuiz_array = [];
        foreach($existingQuiz as $q){
            $existingQuiz_array[] = $q; 
        }
        $index = 0;
        foreach($quiz as $q){
            $q_modified = $q;
            $existing_quiz = $existingQuiz_array[$index];
            $q_modified->id = $existing_quiz["id"];
            $attempts = (array)$q_modified->quiz_attempts;
            $q_modified->quiz_attempts = [];
            foreach ($attempts as $a) {
                $a->id = null;
                $a->quiz = $existing_quiz["id"];
                $a->attempt = 2;
                $q_modified->quiz_attempts[] = $a;
                $DB->insert_record($QUIZ_ATTEMPT_TABLE, $a);
            }
           
            $quiz_array[] = $q_modified;
            $index += 1; 
        }
        

        echo(json_encode($quiz_array));

    }
    function get_course_backup_data(){
        $data = new stdClass;
        $quiz = $this->get_course_quiz_info($this->course_id);
        $data->quiz = $quiz;
        return $data;
    }
    function get_remote_server(){
        global $CFG;
        return $CFG->sychronizationserver;
    }
    function get_course_quiz_info($course_id){
        $quiz_info = (array)$this->get_course_quiz_modules($course_id);
        
        foreach ($quiz_info as $quiz) {
            $quiz_attempts = $this->get_quiz_attempts($quiz->id);
            $quiz_array = (array)$quiz;
            $quiz_array["quiz_attempts"] = (array)$quiz_attempts;

            $quiz_info[$quiz->id]=$quiz_array;
            
        }
       return $quiz_info;

    }

    
    function get_course_quiz_modules($course_id)
    {
        global $DB;
        static $DATA_TABLE = "quiz";
        $quiz = $DB->get_records($DATA_TABLE, ["course"=>$course_id]);
        return $quiz;
    }
    function get_quiz_attempts($quiz_id){
        global $DB;
        static $DATA_TABLE = "quiz_attempts";
        $quiz_attempts = $DB->get_records($DATA_TABLE, ["quiz"=>$quiz_id]);
        return $quiz_attempts;

    }

    
}
new sync_course();