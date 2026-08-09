<?php
require_once "../../config/headers.php";
require_once "../../config/db.php";

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    empty($data->customer_name) ||
    empty($data->customer_email) ||
    empty($data->shipping_address) ||
    empty($data->items) ||
    !is_array($data->items)
) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Customer name, email, shipping address, and order items are required"]);
    exit();
}

try {
    $db->beginTransaction();

    $order_code = 'ORD-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 8));
    $subtotal = (float)($data->subtotal ?? 0);
    $discount = (float)($data->discount ?? 0);
    $tax = (float)($data->tax ?? 0);
    $total_amount = (float)($data->total_amount ?? ($subtotal - $discount + $tax));

    $query = "INSERT INTO orders (order_code, customer_name, customer_email, shipping_address, subtotal, discount, tax, total_amount, status) 
              VALUES (:order_code, :customer_name, :customer_email, :shipping_address, :subtotal, :discount, :tax, :total_amount, 'Processing')";

    $stmt = $db->prepare($query);
    $stmt->execute([
        ':order_code' => $order_code,
        ':customer_name' => htmlspecialchars(strip_tags($data->customer_name)),
        ':customer_email' => filter_var($data->customer_email, FILTER_SANITIZE_EMAIL),
        ':shipping_address' => htmlspecialchars(strip_tags($data->shipping_address)),
        ':subtotal' => $subtotal,
        ':discount' => $discount,
        ':tax' => $tax,
        ':total_amount' => $total_amount
    ]);

    $order_id = $db->lastInsertId();

    $itemStmt = $db->prepare("INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (:order_id, :product_id, :quantity, :unit_price)");
    $stockStmt = $db->prepare("UPDATE products SET stock = GREATEST(0, stock - :qty) WHERE id = :product_id");

    foreach ($data->items as $item) {
        $itemStmt->execute([
            ':order_id' => $order_id,
            ':product_id' => (int)$item->product_id,
            ':quantity' => (int)$item->quantity,
            ':unit_price' => (float)$item->unit_price
        ]);

        // Decrement product stock
        $stockStmt->execute([
            ':qty' => (int)$item->quantity,
            ':product_id' => (int)$item->product_id
        ]);
    }

    $db->commit();

    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Order placed successfully",
        "order_code" => $order_code,
        "order_id" => (int)$order_id,
        "total_amount" => $total_amount
    ]);
} catch (Exception $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to create order: " . $e->getMessage()]);
}
