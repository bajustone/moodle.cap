<?php

require_once(__DIR__ . "../../../config.php");
require_once($CFG->dirroot . "/backup/util/includes/restore_includes.php");

require_once("./classes/utils/xml-processor.php");

class course_sync_details
{
    function __construct($courseId, $backupFilesDir="./courses_backup")
    {
        $this->courseBackupFile = "$backupFilesDir/course_$courseId.mbz";
        
    }
    function extract_backup_file(){
        global $CFG;
        $admin = get_admin();
        if (!$admin) die();
        $backupdir = "restore_" . uniqid();
        $path = $CFG->tempdir . DIRECTORY_SEPARATOR . "backup" . DIRECTORY_SEPARATOR . $backupdir;
       
        $fp = get_file_packer("application/vnd.moodle.backup");
        $fp->extract_to_pathname($this->courseBackupFile, $path);
        return $path;
    }
    function get_course_sync_details(){
    //    $path = $this->extract_backup_file();
       $path = "restore_62f22797bc689";
       return backup_general_helper::get_backup_information($path);

    }
    function parse_xml_files($filePath, $xmlNodeElements){
        // Load the entire file to in-memory array
        $xmlparser = new progressive_parser();
        $xmlparser->set_file($filePath);
        // echo("filePath: $filePath");
        $xmlprocessor = new moodlexml_parser_processor($xmlNodeElements);
        $xmlparser->set_processor($xmlprocessor);
        $xmlparser->process();
        $infoarr = $xmlprocessor->get_all_chunks();
        if (count($infoarr) !== 1) { // Shouldn't happen ever, but...
            throw new backup_helper_exception('problem_parsing_moodle_backup_xml_file');
        }
        $infoarr = $infoarr[0]['tags']; // for commodity
        return $infoarr;
    }
    function get_activities_user_data($backupInfo){
        /**
         * 1. 
         */
            global $CFG;
            $path = $CFG->tempdir . DIRECTORY_SEPARATOR . "backup" . DIRECTORY_SEPARATOR . "restore_62f22797bc689";
            $data = array();
            foreach ($backupInfo->activities as $activity) {
                $activityDir = "$path" . DIRECTORY_SEPARATOR .$activity->directory;
                $filePath = $activityDir . DIRECTORY_SEPARATOR . "module.xml";
                $activityDetails = $this->parse_xml_files($filePath, ["/module"]);
                $moduleName = $activityDetails["modulename"];
                $interestingModuleNodes = ["/activity", "/activity/$moduleName"];
                $modulePath =  $activityDir . DIRECTORY_SEPARATOR . "$moduleName.xml";
                if($moduleName == "quiz"){
                    $interestingModuleNodes[] = "/activity/$moduleName/attempts";
                    $interestingModuleNodes[] = "/activity/$moduleName/attempts/attempt";
                    $interestingModuleNodes[] = "/activity/$moduleName/attempts/attempt/question_usage";
                    $interestingModuleNodes[] = "/activity/$moduleName/attempts/attempt/question_usage/question_attempts";
                    $interestingModuleNodes[] = "/activity/$moduleName/attempts/attempt/question_usage/question_attempts/question_attempt";
                    $interestingModuleNodes[] = "/activity/$moduleName/attempts/attempt/question_usage/question_attempts/question_attempt/steps";
                    $interestingModuleNodes[] = "/activity/$moduleName/attempts/attempt/question_usage/question_attempts/question_attempt/steps/step";
                    $interestingModuleNodes[] = "/activity/$moduleName/attempts/attempt/question_usage/question_attempts/question_attempt/steps/step/response";
                    $interestingModuleNodes[] = "/activity/$moduleName/attempts/attempt/question_usage/question_attempts/question_attempt/steps/step/response/variable";
                    
                }
                $moduleData = $this->parse_xml_files($modulePath, $interestingModuleNodes);
                $data[] = $moduleData;
                return $data;
            }
            echo(json_encode($data));
        
    }
}
