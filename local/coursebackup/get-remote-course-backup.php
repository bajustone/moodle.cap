<?php
require_once(__DIR__ . "../../../config.php");
require_once($CFG->libdir.'/clilib.php');
require_once($CFG->dirroot . '/backup/util/includes/backup_includes.php');
$courses = get_courses();
$course = $courses[2];

$admin = get_admin();
$dir = "./courses_backup/";
$api_backup_web_path = "/local/coursebackup/courses_backup";


$course_id = $_GET['course_id'];

$bc = new backup_controller(backup::TYPE_1COURSE, $course_id, backup::FORMAT_MOODLE,
                            backup::INTERACTIVE_YES, backup::MODE_GENERAL, $admin->id);
$format = $bc->get_format();
$type = $bc->get_type();
$id = $bc->get_id();
$users = $bc->get_plan()->get_setting('users')->get_value();
$anonymised = $bc->get_plan()->get_setting('anonymize')->get_value();
$filename = backup_plan_dbops::get_default_backup_filename($format, $type, $id, $users, $anonymised);
$bc->get_plan()->get_setting('filename')->set_value($filename);

// Execution.
$bc->finish_ui();
$bc->execute_plan();
$results = $bc->get_results();
$file = $results['backup_destination']; 
function serve_file($filepath, $new_filename=null) {
    
    $filename = basename($filepath);
    if (!$new_filename) {
        $new_filename = $filename;
    }
    header('Location: '.$filepath);
}
// Do we need to store backup somewhere else?
if (!empty($dir)) {
    if ($file) {
        if ($file->copy_content_to($dir.'/'.$filename)) {
            $file->delete();
            $file_web_path = $api_backup_web_path . "/"  .$filename;
            echo($file_web_path);
            serve_file($file_web_path);
            exit(0);
        } else {
            mtrace("Destination directory does not exist or is not writable. Leaving the backup in the course backup file area.");
        }
    }
} else {
    mtrace("Backup completed, the new file is listed in the backup area of the given course");
}
$bc->destroy();
