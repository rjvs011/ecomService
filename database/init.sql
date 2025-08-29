-- Create database
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- Create admin user
INSERT INTO users (email, password, first_name, last_name, phone_number, role, enabled, email_verified, created_at, updated_at)
VALUES (
    'admin@printcraft.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
    'Admin',
    'User',
    '+917348995264',
    'ADMIN',
    true,
    true,
    NOW(),
    NOW()
);

-- Insert creative t-shirt products
INSERT INTO products (name, description, price, stock_quantity, image_url, category, brand, sku, rating, review_count, active, created_at, updated_at) VALUES
('Vintage Galaxy Explorer', 'Hand-printed space-themed design with vintage aesthetics. Perfect for stargazers and dreamers.', 29.99, 50, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400', 'Men T-Shirts', 'PrintCraft', 'VGE001', 4.8, 124, true, NOW(), NOW()),
('Retro Music Cassette', 'Nostalgic cassette tape design for music lovers. Soft cotton with vibrant colors.', 27.99, 45, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'Men T-Shirts', 'PrintCraft', 'RMC002', 4.7, 98, true, NOW(), NOW()),
('Abstract Art Explosion', 'Unique hand-painted abstract design. Each shirt is a piece of wearable art.', 34.99, 30, 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400', 'Women T-Shirts', 'PrintCraft', 'AAE003', 4.9, 156, true, NOW(), NOW()),
('Mountain Adventure', 'Minimalist mountain landscape design for outdoor enthusiasts.', 32.99, 60, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', 'Unisex T-Shirts', 'PrintCraft', 'MAD004', 4.6, 89, true, NOW(), NOW()),
('Neon City Nights', 'Cyberpunk-inspired neon design with glow-in-the-dark elements.', 39.99, 25, 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=400', 'Men T-Shirts', 'PrintCraft', 'NCN005', 4.8, 203, true, NOW(), NOW()),
('Botanical Dreams', 'Hand-painted floral design with watercolor effects. Perfect for nature lovers.', 31.99, 40, 'https://images.unsplash.com/photo-1462804993656-fac4ff489837?w=400', 'Women T-Shirts', 'PrintCraft', 'BOT006', 4.7, 167, true, NOW(), NOW()),
('Geometric Harmony', 'Modern geometric patterns in bold colors. Contemporary art meets fashion.', 28.99, 55, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'Unisex T-Shirts', 'PrintCraft', 'GEO007', 4.5, 134, true, NOW(), NOW()),
('Ocean Wave Mandala', 'Intricate mandala design with ocean wave patterns. Hand-drawn with love.', 33.99, 35, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400', 'Women T-Shirts', 'PrintCraft', 'OWM008', 4.9, 189, true, NOW(), NOW()),
('Retro Gaming Controller', 'Pixel art gaming controller design for gamers and retro enthusiasts.', 29.99, 70, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400', 'Men T-Shirts', 'PrintCraft', 'RGC009', 4.8, 212, true, NOW(), NOW()),
('Cosmic Cat Universe', 'Whimsical space cat design with stars and galaxies. Fun and quirky style.', 30.99, 45, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', 'Unisex T-Shirts', 'PrintCraft', 'CCU010', 4.6, 178, true, NOW(), NOW()),
('Tribal Phoenix Rising', 'Majestic phoenix design with tribal art elements. Symbol of rebirth and strength.', 36.99, 30, 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400', 'Men T-Shirts', 'PrintCraft', 'TPR011', 4.7, 145, true, NOW(), NOW()),
('Butterfly Garden Dreams', 'Delicate butterfly and flower design with soft pastel colors.', 32.99, 50, 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', 'Women T-Shirts', 'PrintCraft', 'BGD012', 4.8, 156, true, NOW(), NOW()),
('Street Art Graffiti', 'Urban graffiti-style design with vibrant spray paint effects.', 31.99, 40, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', 'Unisex T-Shirts', 'PrintCraft', 'SAG013', 4.5, 134, true, NOW(), NOW()),
('Zen Buddha Meditation', 'Peaceful Buddha silhouette with meditation quotes. Inner peace vibes.', 34.99, 35, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', 'Unisex T-Shirts', 'PrintCraft', 'ZBM014', 4.9, 167, true, NOW(), NOW()),
('Electric Lightning Storm', 'Dynamic lightning bolt design with electric blue colors.', 33.99, 45, 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=400', 'Men T-Shirts', 'PrintCraft', 'ELS015', 4.7, 123, true, NOW(), NOW());

-- Insert sample reviews for t-shirt products
INSERT INTO reviews (user_id, product_id, rating, comment, created_at, updated_at) VALUES
(1, 1, 5, 'Amazing print quality! The galaxy design looks stunning and the cotton is super soft.', NOW(), NOW()),
(1, 2, 5, 'Love the retro cassette design! Great quality and fits perfectly.', NOW(), NOW()),
(1, 3, 5, 'Absolutely beautiful abstract art! Each piece is truly unique.', NOW(), NOW()),
(1, 4, 4, 'Clean mountain design, very comfortable to wear. Great for hiking trips!', NOW(), NOW()),
(1, 5, 5, 'The glow-in-the-dark effect is incredible! Gets lots of compliments.', NOW(), NOW()),
(1, 6, 5, 'Beautiful botanical design with amazing color details. Feminine and elegant.', NOW(), NOW()),
(1, 7, 4, 'Modern geometric patterns are eye-catching. Good quality cotton.', NOW(), NOW()),
(1, 8, 5, 'The mandala design is intricate and beautiful. Premium feel and fit.', NOW(), NOW()),
(1, 9, 5, 'Perfect for gamers! Pixel art is detailed and colors are vibrant.', NOW(), NOW()),
(1, 10, 4, 'Cute cosmic cat design! Fun and comfortable to wear.', NOW(), NOW());
