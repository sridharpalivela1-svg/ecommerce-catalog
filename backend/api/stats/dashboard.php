<?php
require_once "../../config/headers.php";
require_once "../../config/db.php";

$database = new Database();
$db = $database->getConnection();

try {
    // Total Products
    $prodStmt = $db->query("SELECT COUNT(*) as total_products, SUM(CASE WHEN stock <= 5 THEN 1 ELSE 0 END) as low_stock_count FROM products");
    $prodStats = $prodStmt->fetch(PDO::FETCH_ASSOC);

    // Total Revenue & Total Orders
    $orderStmt = $db->query("SELECT COUNT(*) as total_orders, COALESCE(SUM(total_amount), 0) as total_revenue FROM orders");
    $orderStats = $orderStmt->fetch(PDO::FETCH_ASSOC);

    // Recent 5 Orders
    $recentStmt = $db->query("SELECT order_code, customer_name, total_amount, status, created_at FROM orders ORDER BY id DESC LIMIT 5");
    $recentOrders = $recentStmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "data" => [
            "total_products" => (int)$prodStats['total_products'],
            "low_stock_count" => (int)$prodStats['low_stock_count'],
            "total_orders" => (int)$orderStats['total_orders'],
            "total_revenue" => (float)$orderStats['total_revenue'],
            "recent_orders" => $recentOrders
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
