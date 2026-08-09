<?php
require_once "../../config/headers.php";
require_once "../../config/db.php";

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    empty($data->title) ||
    !isset($data->price) ||
    !isset($data->category_id)
) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Incomplete data. Title, price, and category_id are required."]);
    exit();
}

try {
    $query = "INSERT INTO products 
              (title, description, price, original_price, category_id, stock, rating, image_url, badge) 
              VALUES (:title, :description, :price, :original_price, :category_id, :stock, :rating, :image_url, :badge)";

    $stmt = $db->prepare($query);

    $title = htmlspecialchars(strip_tags($data->title));
    $description = isset($data->description) ? htmlspecialchars(strip_tags($data->description)) : '';
    $price = (float)$data->price;
    $original_price = isset($data->original_price) && $data->original_price ? (float)$data->original_price : null;
    $category_id = (int)$data->category_id;
    $stock = isset($data->stock) ? (int)$data->stock : 10;
    $rating = isset($data->rating) ? (float)$data->rating : 4.5;
    $image_url = isset($data->image_url) && !empty($data->image_url) ? filter_var($data->image_url, FILTER_SANITIZE_URL) : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
    $badge = isset($data->badge) ? htmlspecialchars(strip_tags($data->badge)) : null;

    $stmt->bindParam(":title", $title);
    $stmt->bindParam(":description", $description);
    $stmt->bindParam(":price", $price);
    $stmt->bindParam(":original_price", $original_price);
    $stmt->bindParam(":category_id", $category_id);
    $stmt->bindParam(":stock", $stock);
    $stmt->bindParam(":rating", $rating);
    $stmt->bindParam(":image_url", $image_url);
    $stmt->bindParam(":badge", $badge);

    if ($stmt->execute()) {
        $new_id = (int)$db->lastInsertId();
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "Product created successfully",
            "id" => $new_id
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Unable to create product"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
