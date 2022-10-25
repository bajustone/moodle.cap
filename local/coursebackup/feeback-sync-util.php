<?php 
require_once("./config.php");
header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");

class FeedbackUtil{
    function getUserByEmail($email){
        global $DB;
        return $DB->get_record("user", ["email" => $email]);
    }
    function getFeedbackByCourse($courseid, $name){
        global $DB;
        return $DB->get_record("feedback", array(
            "course" => $courseid,
            "name" => $name
        ));
    }
    function insertFeebackCompletion($feedback){
        global $DB;
        $feedbackData = array(
            "courseid" => $feedback["courseid"],
            "userid" =>  $feedback["userid"],
            "feedback" =>  $feedback["feedback"],
            "anonymous_response" =>  $feedback["anonymous_response"],
            "random_response" =>  $feedback["random_response"],
            "timemodified" => $feedback["timemodified"]

        );
        return $DB->insert_record("feedback_completed", $feedbackData);
    }
    function getFeedbackCompletionForUser($feedbackid, $userId){
        global $DB; 
        return $DB->get_record("feedback_completed", array(
            "feedback" => $feedbackid,
            "userid" => $userId
        ));
    }
    function insertFeedbackValue($value){
        global $DB;
        
        $feedbackValue = array(
            "course_id" => $value["course_id"],
            "item" =>  $value["item"],
            "completed" =>  $value["completed"],
            "tmp_completed" =>  $value["tmp_completed"],
            "value" =>  $value["value"]
        );

        $DB->insert_record("feedback_value", $feedbackValue);
    }
    function getFeedbackItemByPosition($feedback, $position){
        global $DB;
        return $DB->get_record("feedback_item", array(
            "feedback" => $feedback,
            "position" => $position
        ));

    }
    function getFeedbackById($id){
        global $DB;
        return $DB->get_record("feedback", array(
            "id" => $id
        ));
    }
}