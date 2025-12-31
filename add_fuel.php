<?php
require "config.php";

$data = json_decode(file_get_contents("php://input"), true);

$eq_code = $data["eq_code"];
$liters  = $data["liters"];
$date    = $data["log_date"];
$shift   = $data["shift"];

$q = $pdo->prepare("SELECT id FROM equipment WHERE eq_code=?");
$q->execute([$eq_code]);
$eq = $q->fetch();

if(!$eq){
  http_response_code(404);
  echo json_encode(["error"=>"Equipment not found"]);
  exit;
}

$ins = $pdo->prepare(
  "INSERT INTO fuel_logs (equipment_id,log_date,shift,liters)
   VALUES (?,?,?,?)"
);
$ins->execute([$eq["id"],$date,$shift,$liters]);

echo json_encode(["success"=>true]);
