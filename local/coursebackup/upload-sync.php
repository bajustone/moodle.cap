<?php
require_once(__DIR__ . "../../../config.php");
require_once($CFG->dirroot . '/local/coursebackup/classes/utils/restore.php');


$json = file_get_contents('php://input');
$data = json_decode($json);
$result = array();
$result['success'] = false; 

$cap_backup_dir = "./courses_backup";

$course = get_course($data->course_id);

$output_file = $cap_backup_dir . DIRECTORY_SEPARATOR . $course->id . '.mbz';

$data_array = explode( ',', $data->backup_file_data );

try{
// we could add validation here with ensuring count( $data ) > 1
$result['success'] = true; 

$file = fopen( $output_file, 'wb' );


fwrite( $file, base64_decode( $data_array[ 1 ] ) );


// clean up the file resource



$restore = new restore_all_courses($cap_backup_dir, $course->id . '.mbz' );
$restoreResult = $restore->execute_restore_plan((int) $course->id, 1);
	$result['success'] = true; 
}catch (Exception $e) {
	$result['success'] = true; 
    
	$result['message'] = "....." . $e->message;
}
echo(json_encode($result));
