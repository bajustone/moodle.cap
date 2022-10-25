<?php 
include("./config.php");
header("Content-type: Application/json");
$isSiteAdmin= is_siteadmin();
if(!$isSiteAdmin){
     echo(json_encode(array("isAdmin" => false)));
     return;
}
echo(json_encode(array("isAdmin" => true)));
