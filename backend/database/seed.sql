USE `ecommerce_catalog`;

-- Insert initial Categories
INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Mobiles & Smartphones', 'mobiles'),
(2, 'Fashion & Apparel', 'fashion'),
(3, 'Electronics', 'electronics'),
(4, 'Audio', 'audio'),
(5, 'Home & Living', 'home-living'),
(6, 'Accessories', 'accessories')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Insert Sample Seed Products in Indian Rupees (₹)
INSERT INTO `products` (`id`, `title`, `description`, `price`, `original_price`, `category_id`, `stock`, `rating`, `review_count`, `image_url`, `badge`) VALUES
(1, 'Apple iPhone 15 Pro Max (256 GB) - Natural Titanium', 'Forged in titanium with A17 Pro chip, customizable Action button, 48MP main camera system with 5x Telephoto optical zoom, and Super Retina XDR display.', 149900.00, 159900.00, 1, 12, 4.90, 342, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80', 'Flipkart Choice'),
(2, 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB, 512GB)', 'Galaxy AI is here. 200MP camera with AI Zoom, built-in S Pen, Snapdragon 8 Gen 3 for Galaxy, and quad HD+ Dynamic AMOLED 2X display.', 129999.00, 139999.00, 1, 15, 4.80, 289, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80', 'Amazon Bestseller'),
(3, 'OnePlus 12 5G (Silky Black, 16GB RAM, 512GB Storage)', 'Powered by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System for Mobile, 120Hz ProXDR display with LTPO 3.0, and 100W SUPERVOOC fast charging.', 64999.00, 69999.00, 1, 20, 4.70, 198, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80', 'Top Rated'),
(4, 'Google Pixel 8 Pro (Obsidian, 12GB RAM, 128GB)', 'Google Tensor G3 chip, fully upgraded pro camera system with 5x telephoto, Best Take photo editing, and 24-hour battery life.', 88999.00, 106999.00, 1, 10, 4.70, 154, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80', 'AI Special'),
(5, 'Xiaomi Redmi Note 13 Pro+ 5G (Fusion Purple, 12GB, 512GB)', '200MP OIS camera, 3D Curved AMOLED 120Hz display, IP68 dust & water resistance, MediaTek Dimensity 7200-Ultra, and 120W HyperCharge.', 31999.00, 35999.00, 1, 25, 4.60, 420, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80', 'Hot Deal'),
(6, 'Nothing Phone (2a) 5G (Black, 8GB RAM, 128GB Storage)', 'Unique transparent design with Glyph Interface lighting, custom Dimensity 7200 Pro 4nm processor, and dual 50MP rear camera setup.', 23999.00, 25999.00, 1, 30, 4.60, 512, 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80', 'Popular'),
(7, 'Levi\'s Men\'s 511 Slim Fit Stretchable Denim Jeans (Dark Indigo)', 'Classic 5-pocket styling denim jeans crafted from premium stretchable cotton fabric for maximum flexibility, slim fit silhouette, and modern everyday style.', 2799.00, 3999.00, 2, 22, 4.50, 215, 'https://images.unsplash.com/photo-1542272604-780c36856842?w=600&auto=format&fit=crop&q=80', '30% OFF'),
(8, 'Allen Solly Men\'s Premium Cotton Polo T-Shirt (Navy Blue)', 'Soft breathable 100% combed cotton polo t-shirt with signature embroidered logo on chest, ribbed collar, and stylish contrast side slits.', 1199.00, 1699.00, 2, 40, 4.40, 310, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80', 'Fashion Bestseller'),
(9, 'Puma Men\'s Smash v2 Leather Sneakers (White & Black)', 'Classic tennis-inspired low boot leather sneakers with comfortable SoftFoam+ sockliner, rubber outsole for traction, and iconic Puma formstrip.', 2999.00, 4999.00, 2, 18, 4.70, 180, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80', '40% OFF'),
(10, 'BIBA Women\'s Printed Anarkali Kurta & Dupatta Set (Royal Blue)', 'Elegant ethnic floral printed cotton Anarkali kurta set with flared hemline, V-neck, three-quarter sleeves, and matching printed dupatta.', 3499.00, 5999.00, 2, 15, 4.80, 95, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80', 'Festive Special'),
(11, 'Aura ANC Wireless Headphones', 'Studio-quality wireless over-ear headphones with active noise cancellation, 40-hour battery life, and ultra-soft memory foam ear cushions.', 14999.00, 19999.00, 4, 14, 4.80, 142, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80', 'Best Seller'),
(12, 'Ergonomic Mechanical Keyboard', 'Compact 75% hot-swappable RGB mechanical keyboard with custom lubricated switches and acoustic dampening foam.', 8999.00, 10999.00, 3, 8, 4.90, 210, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80', 'Top Rated')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `price` = VALUES(`price`);
