<?php
require "config.php";

$sql = "
SELECT f.id, f.log_date, f.shift, f.liters, e.eq_code, e.eq_name
FROM fuel_logs f
JOIN equipment e ON e.id = f.equipment_id
ORDER BY f.log_date DESC
";

$data = $pdo->query($sql)->fetchAll();
echo json_encode($data);
