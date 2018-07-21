<?php 
	
//echo  $_SERVER['SERVER_NAME'];
if(!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'],'1tool.org') === false){
 exit;
}


$text = $_POST[tool];
//检测非法函数
$myArray = array("fopen","fwrite","mkdir","rmdir","unlink","eval");
foreach($myArray as $key=>$val) {
if(strpos($text,$val) !== false){ 
 echo '包含'.$val.'非法函数'; 
 exit;
}
}


function isExist($file) {
        $file = $_SERVER['DOCUMENT_ROOT'] . $file;
        if (!file_exists($file)) {
            mkdir($file);
}
}

isExist('/cache/');

$randData = rand(1,1000);
$fp = fopen($_SERVER['DOCUMENT_ROOT'] .'/cache/'.$randData.'.php', "w");
fwrite($fp, $text);
fclose($fp);
$f = "http://".$_SERVER['SERVER_NAME']."/cache/".$randData.".php";
$result = file_get_contents($f);
$result = str_replace("xlphp.net","1tool.org",$result);
$result = str_replace("/xl_22311638","",$result);
$result = str_replace("/cache","",$result);
$result = str_replace("fast-page.org","1tool.org",$result);
//$result = preg_replace("/([\s\S]*?)/","",$str);
echo $result;
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
//eval($_POST[tool]);  

?>