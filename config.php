<?php

unset($CFG);  // Ignore this line
global $CFG;  // This is necessary here for PHPUnit execution
$CFG = new stdClass();

$CFG->dbtype    = 'mysqli';      // 'pgsql', 'mariadb', 'mysqli', 'auroramysql', 'sqlsrv' or 'oci'
$CFG->dblibrary = 'native';     // 'native' only at the moment
$CFG->dbhost    = 'localhost';  // eg 'localhost' or 'db.isp.com' or IP
$CFG->dbname    = 'moodle';     // database name, eg moodle
$CFG->dbuser    = 'root';   // your database username
$CFG->dbpass    = 'cap123';   // your database password
$CFG->prefix    = 'mdl_';       // prefix to use for all table names

$CFG->wwwroot   = '192.168.1.1';

$CFG->dataroot  = '/var/www/moodledata';

$CFG->sychronizationserver = "http://197.243.24.148";

$CFG->directorypermissions = 02777;

$CFG->admin = 'admin';
require_once(__DIR__ . '/lib/setup.php'); // Do not edit