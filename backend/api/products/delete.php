<?php
require_once "../../config/headers.php";
require_once "../../config/db.php";

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$id = isset($data->id) ? (int)$data->id : (isset($_GET['id']) ? (int)$_GET['id'] : 0);

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Valid product ID is required for deletion"]);
    exit();
}

try {
    $stmt = $db->prepare("DELETE FROM products WHERE id = :id");
    $stmt->bindParam(":id", $id);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Product deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Unable to delete product"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
