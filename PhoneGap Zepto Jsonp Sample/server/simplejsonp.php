<?php header('content-type: application/json; charset=utf-8');
$data = array(1, 2, 3, 4, 5, 6, 7, 8, 9);
echo $_GET['callback'].'('.json_encode($data).')';
?>