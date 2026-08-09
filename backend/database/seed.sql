USE `ecommerce_catalog`;

-- Insert initial Categories
INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Mobiles & Smartphones', 'mobiles'),
(2, 'Electronics', 'electronics'),
(3, 'Audio', 'audio'),
(4, 'Fashion', 'fashion'),
(5, 'Home & Living', 'home-living'),
(6, 'Accessories', 'accessories')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Insert Sample Seed Products in Indian Rupees (₹)
INSERT INTO `products` (`id`, `title`, `description`, `price`, `original_price`, `category_id`, `stock`, `rating`, `review_count`, `image_url`, `badge`) VALUES
(1, 'Apple iPhone 15 Pro Max (256 GB) - Natural Titanium', 'Forged in titanium with A17 Pro chip, customizable Action button, 48MP main camera system with 5x Telephoto optical zoom, and Super Retina XDR display.', 149900.00, 159900.00, 1, 12, 4.90, 342, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80', 'Flipkart Choice'),
(2, 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB, 512GB)', 'Galaxy AI is here. 200MP camera with AI Zoom, built-in S Pen, Snapdragon 8 Gen 3 for Galaxy, and quad HD+ Dynamic AMOLED 2X display.', 129999.00, 139999.00, 1, 15, 4.80, 289, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80', 'Amazon Bestseller'),
(3, 'OnePlus 12 5G (Silky Black, 16GB RAM, 512GB Storage)', 'Powered by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System for Mobile, 120Hz ProXDR display with LTPO 3.0, and 100W SUPERVOOC fast charging.', 64999.00, 69999.00, 1, 20, 4.70, 198, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80', 'Top Rated'),
(4, 'Xiaomi Redmi Note 13 Pro+ 5G (Fusion Purple, 12GB, 512GB)', '200MP OIS camera, 3D Curved AMOLED 120Hz display, IP68 dust & water resistance, MediaTek Dimensity 7200-Ultra, and 120W HyperCharge.', 31999.00, 35999.00, 1, 25, 4.60, 420, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80', 'Hot Deal'),
(5, 'Realme GT 6 5G (Fluid Silver, 12GB RAM, 256GB Storage)', 'World’s brightest 6000 nits Ultra Bright Display, Snapdragon 8s Gen 3 flagship processor, 50MP Sony LYT-808 OIS main camera, and 120W SuperVOOC charging.', 40999.00, 44999.00, 1, 18, 4.70, 165, 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80', 'Trending'),
(6, 'Aura ANC Wireless Headphones', 'Studio-quality wireless over-ear headphones with active noise cancellation, 40-hour battery life, and ultra-soft memory foam ear cushions.', 14999.00, 19999.00, 3, 14, 4.80, 142, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80', 'Best Seller'),
(7, 'Minimalist Leather Smart Watch', 'Sleek smartwatch featuring an AMOLED display, heart rate tracking, sleep monitoring, and a premium genuine Italian leather strap.', 9999.00, 12999.00, 2, 10, 4.60, 89, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', 'Popular'),
(8, 'Ergonomic Mechanical Keyboard', 'Compact 75% hot-swappable RGB mechanical keyboard with custom lubricated switches and acoustic dampening foam.', 8999.00, 10999.00, 2, 8, 4.90, 210, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80', 'Top Rated')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `price` = VALUES(`price`);
