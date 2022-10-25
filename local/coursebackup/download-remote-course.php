<?php
require_once(__DIR__ . "../../../config.php");
require_once($CFG->dirroot . '/local/coursebackup/classes/utils/restore.php');

$course_id = $_GET['course_id'];
$synServer = $CFG->sychronizationserver;
if(!$synServer){
    die("Remote server not found");
}
// Initialize a file URL to the variable
$url = "$synServer/local/coursebackup/get-remote-course-backup.php?course_id=" . $course_id;

$file_name = "course_" . $course_id . ".mbz";
$destination_dir = "./courses_backup";

$resultObj = new stdClass;

// require_login((int) $course_id, false);
if (!is_writable($destination_dir) or !is_dir($destination_dir)) {
        $resultObj->status = false;
        $resultObj->message = "course-backup is not a valid destination dir";
} else {
        $file_final_name =$destination_dir . DIRECTORY_SEPARATOR . $file_name;
        
        try {
                $course_file = file_get_contents($url);
                if(!$course_file){
                       $resultObj->message = "could not download course files";
                       echo (json_encode($resultObj));
                       die(); 
                }
                $file = fopen( $file_final_name, 'wb' );
                
                if(!fwrite( $file, $course_file )){
                        $resultObj->message = "could not save course files";
                        $resultObj->file = "$file_final_name";

                        echo (json_encode($resultObj));
                        die();  
                }

                $restore = new restore_all_courses( $destination_dir, $file_name);
                $restoreResult = $restore->execute_restore_plan((int) $course_id, 1);
                $resultObj->status = $restoreResult;
                if($resultObj->status){

                        $resultObj->message = "course synced successfully";
                }
                else{
                        $resultObj->message = "Sync failed";

                }
        } catch (Exception $e) {
                $resultObj->message = $e->message;
                $resultObj->status = false;
        }
}

echo (json_encode($resultObj));
