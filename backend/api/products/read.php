<?php
require_once "../../config/headers.php";
require_once "../../config/db.php";

$database = new Database();
$db = $database->getConnection();

// Parse query params
$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$sort = isset($_GET['sort']) ? trim($_GET['sort']) : 'newest';
$min_price = isset($_GET['min_price']) ? (float)$_GET['min_price'] : 0;
$max_price = isset($_GET['max_price']) ? (float)$_GET['max_price'] : 999999;

try {
    $sql = "SELECT p.*, c.name AS category_name, c.slug AS category_slug 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.price >= :min_price AND p.price <= :max_price";
    
    $params = [
        ':min_price' => $min_price,
        ':max_price' => $max_price
    ];

    if (!empty($category) && strtolower($category) !== 'all') {
        $sql .= " AND (c.slug = :category OR c.name = :category)";
        $params[':category'] = $category;
    }

    if (!empty($search)) {
        $sql .= " AND (p.title LIKE :search OR p.description LIKE :search)";
        $params[':search'] = '%' . $search . '%';
    }

    // Sorting
    switch ($sort) {
        case 'price-asc':
            $sql .= " ORDER BY p.price ASC";
            break;
        case 'price-desc':
            $sql .= " ORDER BY p.price DESC";
            break;
        case 'rating':
            $sql .= " ORDER BY p.rating DESC";
            break;
        case 'newest':
        default:
            $sql .= " ORDER BY p.id DESC";
            break;
    }

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Format numbers
    foreach ($products as &$item) {
        $item['id'] = (int)$item['id'];
        $item['price'] = (float)$item['price'];
        $item['original_price'] = $item['original_price'] ? (float)$item['original_price'] : null;
        $item['stock'] = (int)$item['stock'];
        $item['rating'] = (float)$item['rating'];
        $item['review_count'] = (int)$item['review_count'];
    }

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "count" => count($products),
        "data" => $products
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error fetching products: " . $e->getMessage()
    ]);
}
