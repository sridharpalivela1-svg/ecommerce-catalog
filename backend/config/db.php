<?php
/**
 * Database Connection Config using PHP Data Objects (PDO)
 * Security: Prepared Statements enabled, SQL Injection Prevention
 */

class Database {
    private $host = "localhost";
    private $db_name = "ecommerce_catalog";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username,
                $this->password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        } catch(PDOException $exception) {
            // Return clean JSON error instead of exposing stack traces
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Database connection error: " . $exception->getMessage()
            ]);
            exit();
        }

        return $this->conn;
    }
}
