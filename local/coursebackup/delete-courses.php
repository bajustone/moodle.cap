<?php
require_once("./config.php");
header("Content-Type: application/json");

 

class delete_all_courses{
    function __construct()
    {
        global $DB;
        $url = new moodle_url($_SERVER["REQUEST_URI"]);
        $this->course_id = (int) $url->get_param("course_id"); 
        $this->course = $DB->get_record("course", array(
            "id" =>  $this->course_id
        ));
       

        $this->delete_courses();
       
       
    }
    function delete_courses(){
        
        $res = new stdClass;
        $res->success = true;
       
        if($this->course){
            $res->mm=$this->course_id;  
            if($this->course->id != 1) {
                delete_course($this->course->id, false);
            }
        }
        echo(json_encode($res));
    }
    
  

    
}
new delete_all_courses();