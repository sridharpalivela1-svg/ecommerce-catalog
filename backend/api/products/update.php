<?php
require_once "../../config/headers.php";
require_once "../../config/db.php";

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (empty($data->id)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Product ID is required for update"]);
    exit();
}

try {
    $query = "UPDATE products 
              SET title = :title, 
                  description = :description, 
                  price = :price, 
                  original_price = :original_price, 
                  category_id = :category_id, 
                  stock = :stock, 
                  badge = :badge,
                  image_url = :image_url
              WHERE id = :id";

    $stmt = $db->prepare($query);

    $id = (int)$data->id;
    $title = htmlspecialchars(strip_tags($data->title));
    $description = isset($data->description) ? htmlspecialchars(strip_tags($data->description)) : '';
    $price = (float)$data->price;
    $original_price = isset($data->original_price) && $data->original_price ? (float)$data->original_price : null;
    $category_id = (int)$data->category_id;
    $stock = (int)$data->stock;
    $badge = isset($data->badge) ? htmlspecialchars(strip_tags($data->badge)) : null;
    $image_url = filter_var($data->image_url, FILTER_SANITIZE_URL);

    $stmt->bindParam(":id", $id);
    $stmt->bindParam(":title", $title);
    $stmt->bindParam(":description", $description);
    $stmt->bindParam(":price", $price);
    $stmt->bindParam(":original_price", $original_price);
    $stmt->bindParam(":category_id", $category_id);
    $stmt->bindParam(":stock", $stock);
    $stmt->bindParam(":badge", $badge);
    $stmt->bindParam(":image_url", $image_url);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Product updated successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Unable to update product"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
