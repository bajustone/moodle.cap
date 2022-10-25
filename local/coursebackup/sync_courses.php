<?php
$file = fopen("/var/www/course-backup/testfile.tx", "w");
$txt = "Hello world";
fwrite($file, $txt);
