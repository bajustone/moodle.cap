<?php
require_once("./config.php");
header("Content-type: application/json");

$url = new moodle_url($_SERVER["REQUEST_URI"]);
$course_id = (int) $url->get_param("course_id");

if(!$course_id){
    echo("No course Id");
    return;
}
global $DB;
$courseModules = $DB->get_records("course_modules", array("course"=>$course_id));
$arrayOfCourseModules = array();
foreach($courseModules as $module){
    $arrayOfCourseModules[] = $module;
}

echo(json_encode(array("data"=>$arrayOfCourseModules)));