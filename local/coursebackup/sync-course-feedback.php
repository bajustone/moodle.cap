<?php
require_once("./config.php");
require_once("./feeback-sync-util.php");
header("Content-type: application/json");

$method = $_SERVER["REQUEST_METHOD"];
if($method !== "POST"){
    $response->message = "invalid request method";
    echo(json_encode($response));
    die();
}
$bodyText = file_get_contents('php://input');
$requestBody = json_decode($bodyText);

$response = new stdClass;

$courseId = $requestBody->courseId;
$users = $requestBody->users;
$feedbackCompletions = $requestBody->feedbackCompletions;
$feedbackItems = (array)$requestBody->feedbackItems;
$feedbackValues = $requestBody->feedbackValues;
$feedbackUtil = new FeedbackUtil();

$success = true;
foreach ($feedbackCompletions as $feebackCompletionId => $feedbackCompletion) {
    $capFeedbackId = $feedbackCompletion->feedback;

    $feedback = $feedbackUtil->getFeedbackByCourse($courseId, $feedbackCompletion->feedback_name);
    $capUser = $users->$feebackCompletionId;
    $user = $feedbackUtil->getUserByEmail($capUser->email);

    $comp = $feedbackUtil->getFeedbackCompletionForUser(
        $feedback->id,
        $user->id
    );
    if($comp){
        continue;
    }

    $insertFeebackCompletion = $feedbackUtil->insertFeebackCompletion(array(
        "courseid" => $courseId,
        "userid" =>  $user->id,
        "feedback" =>  $feedback->id,
        "anonymous_response" =>  $feedbackCompletion->anonymous_response,
        "random_response" =>  $feedbackCompletion->random_response,
        "timemodified" => $feedbackCompletion->timemodified
    ));
    foreach ($feedbackValues as $key => $value) {
        $items = (array)$feedbackItems[$capFeedbackId];
        $item =  $items[$value->item];
        $remoteItem = $feedbackUtil->getFeedbackItemByPosition(
            $feedback->id,
            $item->position
        );
        $feedbackValue = $feedbackUtil->insertFeedbackValue(array(
            "course_id" => $courseId,
            "item" =>  $remoteItem->id,
            "completed" =>  $insertFeebackCompletion,
            "tmp_completed" =>  $value->tmp_completed,
            "value" =>  $value->value
        ));
        
    }
}


echo(json_encode([
    "success"=> $success,
    "message" => "success"
]));