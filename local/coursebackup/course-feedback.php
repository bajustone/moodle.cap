<?php
require_once("./config.php");
header("Content-type: application/json");
require_once("./feeback-sync-util.php");


$url = new moodle_url($_SERVER["REQUEST_URI"]);
$course_id = (int) $url->get_param("course_id");
$context = null;
try {
    $context = context_course::instance($course_id);
} catch (\Throwable $th) {
   return json_encode([
    "message" => "course not found"
   ]);
   die();
}

if(!$course_id){
    echo(json_encode(["message" => "course_id not found"]));
    return;
}
global $DB;

$resultObj = new stdClass;

$enrolledUsers = get_enrolled_users($context);


$getFeedbackCompletions = function(){
    global $DB;
   
    $f = $DB->get_records("feedback_completed");
    $addFeedbackName = function($v){
        $feedbackUtil = new FeedbackUtil();
        $feedback = $feedbackUtil->getFeedbackById($v->feedback);
        if($feedback){
            $v->feedback_name = $feedback->name;
        }
        return $v;
    };
    return array_map(fn($v)=> $addFeedbackName($v), $f);

};

$feedbackCompletions = $getFeedbackCompletions();
// array_map($addFeedbackName, );
$feedbackValues= $DB->get_records("feedback_value");

$f = function($v, $enrolledUsers){
    $userid = $v->userid;
    $user = $enrolledUsers[$userid];
    if($user != null){
        $user = [
            "id" => $user -> id,
            "email" => $user -> email,
            "username" => $user -> username,
        ];
    }
    return  $user;
};

$g = function($k, $capUses){
    global $DB;
    // $feedbackUtil = new FeedbackUtil();
    // $feedback = $feedbackUtil->getFeedbackById($k->feedback);
    $a = isset($capUses[$k->id]);
   
    return $a;
};
$h = function($k, $capUses){
    $a = isset($capUses[$k->completed]);
    return $a;
};
function getFeedbackItems(){
    global $DB;
    $items = $DB->get_records("feedback_item");
    $capFeedbackItems = [];
    foreach ($items as $key => $item) {
       if(isset($capFeedbackItems[$item->feedback])){
        $capFeedbackItems[$item->feedback][$item->id] = $item;
        }else{
            $capFeedbackItems[$item->feedback] = [];
            $capFeedbackItems[$item->feedback][$item->id] = $item;
       }
    }
    return $capFeedbackItems;
}

$users = array_map(fn ($v) => $f($v, $enrolledUsers), $feedbackCompletions);
$capUses = array_filter($users, fn($k, $v) => $k != null, ARRAY_FILTER_USE_BOTH);
$capCompletions = array_filter($feedbackCompletions, fn ($k)=>$g($k, $capUses));
$capFeedbackValues = array_filter($feedbackValues, fn ($k)=>$h($k, $capUses));
$feedbackItems = getFeedbackItems();


$resultObj->feedbackCompletions = $capCompletions;
$resultObj->feedbackItems = $feedbackItems;
$resultObj->feedbackValues= $capFeedbackValues;
$resultObj->users = $capUses;
$resultObj->courseId = $course_id;



echo(json_encode($resultObj));
