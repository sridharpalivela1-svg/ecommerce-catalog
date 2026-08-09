USE `ecommerce_catalog`;

-- Insert initial Categories
INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Electronics', 'electronics'),
(2, 'Audio', 'audio'),
(3, 'Fashion', 'fashion'),
(4, 'Home & Living', 'home-living'),
(5, 'Accessories', 'accessories')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Insert Sample Seed Products
INSERT INTO `products` (`id`, `title`, `description`, `price`, `original_price`, `category_id`, `stock`, `rating`, `review_count`, `image_url`, `badge`) VALUES
(1, 'Aura ANC Wireless Headphones', 'Studio-quality wireless over-ear headphones with active noise cancellation, 40-hour battery life, and ultra-soft memory foam ear cushions.', 199.99, 249.99, 2, 18, 4.8, 142, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80', 'Best Seller'),
(2, 'Minimalist Leather Smart Watch', 'Sleek smartwatch featuring an AMOLED display, heart rate tracking, sleep monitoring, and a premium genuine Italian leather strap.', 149.50, 180.00, 1, 12, 4.6, 89, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', 'Popular'),
(3, 'Ergonomic Mechanical Keyboard', 'Compact 75% hot-swappable RGB mechanical keyboard with custom lubricated switches and acoustic dampening foam.', 119.00, 139.00, 1, 8, 4.9, 210, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80', 'Top Rated'),
(4, 'Vanguard Canvas Travel Backpack', 'Durable water-resistant canvas backpack with dedicated 16-inch laptop compartment, hidden security pocket, and USB charging port.', 79.99, 99.99, 3, 25, 4.7, 76, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80', NULL),
(5, 'Pulse Bass Waterproof Speaker', 'Portable Bluetooth speaker delivering 360-degree room-filling sound, IPX7 waterproof rating, and 20 hours of continuous continuous playtime.', 64.99, 79.99, 2, 30, 4.5, 115, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80', 'Sale'),
(6, 'Nordic Ceramic Coffee Mug Set', 'Handcrafted matte ceramic coffee mug set of 4, designed with minimalist aesthetics and ergonomic heat-insulated handles.', 34.50, 42.00, 4, 15, 4.6, 53, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80', NULL),
(7, 'Ultra-Slim Wireless Power Bank', '10,000mAh magnetic wireless fast-charging power bank compatible with MagSafe and USB-C Power Delivery.', 49.99, 59.99, 1, 4, 4.4, 98, 'https://images.unsplash.com/photo-1609592424074-1296c5689100?w=600&auto=format&fit=crop&q=80', 'Low Stock'),
(8, 'Retro Polaroid Instant Camera', 'Classic analogue instant camera featuring autofocus, double exposure mode, built-in flash, and rechargeable lithium battery.', 99.00, 119.00, 1, 10, 4.7, 164, 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80', 'Trending')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `price` = VALUES(`price`);
