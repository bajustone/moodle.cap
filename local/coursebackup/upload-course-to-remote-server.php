<?php
require_once(__DIR__ . "../../../config.php");
require_once($CFG->libdir.'/clilib.php');
require_once($CFG->dirroot . '/backup/util/includes/backup_includes.php');

$synServer = $CFG->sychronizationserver;
if(!$synServer){
    die("Remote server not found");
}
$cap_backup_dir = "./courses_backup";
$server_url = $synServer ."/local/coursebackup/upload-sync.php";

$resultObj = new stdClass;
$courseId = (int) $_GET["course_id"];
$course = $DB->get_record('course', array('id' => $courseId), '*', MUST_EXIST);
$admin = get_admin();
if(!$admin){
    $resultObj->status = false;

    echo(json_encode($resultObj));
    die();
}
$bc = new backup_controller(backup::TYPE_1COURSE, $course->id, backup::FORMAT_MOODLE,
                            backup::INTERACTIVE_YES, backup::MODE_GENERAL, $admin->id); $format = $bc->get_format(); $type = $bc->get_type(); $id = $bc->get_id(); $users = $bc->get_plan()->get_setting('users')->get_value(); $anonymised = $bc->get_plan()->get_setting('anonymize')->get_value(); $filename = backup_plan_dbops::get_default_backup_filename($format, $type, $id, $users, $anonymised);
$bc->get_plan()->get_setting('filename')->set_value($filename);

$bc->finish_ui();
$bc->execute_plan();
$results = $bc->get_results();
$file = $results['backup_destination'];

$dir = $cap_backup_dir;
if ($file) {
    $path = $dir . DIRECTORY_SEPARATOR . $filename;
    if ($file->copy_content_to($path)) {
       
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:application/zip' . ';base64,' . base64_encode($data);
        $file->delete();
    }
}

$request_data = array(
    "course_id" => $courseId,
    "backup_file_data" => $base64
);
$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($request_data)
    )
);
$context  = stream_context_create($options);
$http_result = file_get_contents($server_url, false, $context);
if ($http_result === FALSE) { 
//    echo("...$server_url");
echo(json_encode(array("success"=> false)));
die();
 }
 $resultObj->success = true;
    $resultObj->message = "success";

 echo(json_encode($resultObj));
$bc->destroy();
