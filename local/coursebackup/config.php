<?php
require_once(__DIR__ . "../../../config.php");

define("BACKUP_DIR", "./courses_backup");

define("WEB_SERVICE_REQUEST_OPTIONS", array(
    // "wstoken"       =>  "1bd6f88ee3b17e1f4768bdb18b476958",
    "wstoken"       =>  "181a897360241762723b5d50fbdd137b",
    "wsfunction"    =>  "core_grades_update_grades",
    "moodlewsrestformat"    =>  "json"
));

define("WEB_SERVICE_REQUEST_USERS_OPTIONS", array(
    "wstoken"       =>  "181a897360241762723b5d50fbdd137b",
    "wsfunction"    =>  "core_enrol_get_enrolled_users",
    "moodlewsrestformat"    =>  "json"
));