<?php
require_once "../../config/headers.php";
require_once "../../config/db.php";

$database = new Database();
$db = $database->getConnection();

try {
    $stmt = $db->prepare("SELECT c.*, COUNT(p.id) as product_count FROM categories c LEFT JOIN products p ON c.id = p.category_id GROUP BY c.id ORDER BY c.name ASC");
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($categories as &$cat) {
        $cat['id'] = (int)$cat['id'];
        $cat['product_count'] = (int)$cat['product_count'];
    }

    http_response_code(200);
    echo json_encode(["status" => "success", "data" => $categories]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
