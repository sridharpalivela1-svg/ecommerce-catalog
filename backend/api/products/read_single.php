<?php
require_once "../../config/headers.php";
require_once "../../config/db.php";

$database = new Database();
$db = $database->getConnection();

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid product ID"]);
    exit();
}

try {
    $stmt = $db->prepare("SELECT p.*, c.name AS category_name, c.slug AS category_slug FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = :id LIMIT 1");
    $stmt->execute([':id' => $id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        $product['id'] = (int)$product['id'];
        $product['price'] = (float)$product['price'];
        $product['original_price'] = $product['original_price'] ? (float)$product['original_price'] : null;
        $product['stock'] = (int)$product['stock'];
        $product['rating'] = (float)$product['rating'];

        http_response_code(200);
        echo json_encode(["status" => "success", "data" => $product]);
    } else {
        http_response_code(44);
        echo json_encode(["status" => "error", "message" => "Product not found"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
