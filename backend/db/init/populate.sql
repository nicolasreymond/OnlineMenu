-- This SQL script populates the database with initial data for categories and menu items.

INSERT INTO users (username, password_hash, email) VALUES
('admin', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'admin@example.com'),
('user1', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'user1@example.com');

INSERT INTO categories (name, description) VALUES
('Beer', 'A variety of beers including ales, lagers, and stouts.'),
('Wine', 'A selection of red, white, and sparkling wines.'),
('Spirits', 'Premium spirits including whiskey, vodka, and rum.'),
('Cocktails', 'Signature cocktails crafted by our expert mixologists.'),
('Non-Alcoholic', 'Refreshing non-alcoholic beverages.');

INSERT INTO menu_items (name, price, abv, description, image_url, category_id) VALUES
('IPA', 5.00, 6.5, 'A hoppy and bitter India Pale Ale.', 'https://example.com/images/ipa.jpg', 1),
('Stout', 6.00, 7.0, 'A rich and creamy stout with coffee notes.', 'https://example.com/images/stout.jpg', 1),
('Chardonnay', 8.00, 0.0, 'A crisp and refreshing white wine.', 'https://example.com/images/chardonnay.jpg', 2),
('Cabernet Sauvignon', 10.00, 0.0, 'A full-bodied red wine with dark fruit flavors.', 'https://example.com/images/cabernet.jpg', 2),
('Whiskey Sour', 9.00, 0.0, 'A classic cocktail made with whiskey and lemon juice.', 'https://example.com/images/whiskey_sour.jpg', 4),
('Mojito', 7.00, 0.0, 'A refreshing cocktail with mint and lime.', 'https://example.com/images/mojito.jpg', 4),
('Coke', 2.00, 0.0, 'Classic Coca-Cola soft drink.', 'https://example.com/images/coke.jpg', 5),
('Lemonade', 3.00, 0.0, 'Freshly squeezed lemonade.', 'https://example.com/images/lemonade.jpg', 5);