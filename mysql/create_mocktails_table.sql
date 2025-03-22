


//Création table mocktails

CREATE TABLE mocktails (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    ingredients TEXT,
    recipe TEXT,
    PRIMARY KEY (id)
);


//Initialisation de la table mocktails

INSERT INTO mocktails (name, ingredients, recipe) VALUES
('Mojito Virgin', 'Jus de citron vert (50%), Sirop de menthe (20%), Eau gazeuse (30%)', ''),
('Sunset Passion', 'Jus d\'ananas (60%), Jus de citron vert (20%), Eau gazeuse (20%)', ''),
('Berry Sparkler', 'Jus d\'ananas (70%), Jus de citron vert (10%), Eau gazeuse (20%)', ''),
('Citrus Fizz', 'Jus de citron vert (60%), Sirop de menthe (10%), Eau gazeuse (30%)', ''),
('Tropical Breeze', 'Jus d\'ananas (50%), Jus de citron vert (20%), Eau gazeuse (30%)', ''),
('Spicy Maple Cooler', 'Jus d\'ananas (60%), Jus de citron vert (20%), Sirop de menthe (10%), Eau gazeuse (10%)', ''),
('Minty Pineapple', 'Jus d\'ananas (60%), Sirop de menthe (10%), Eau gazeuse (30%)', ''),
('Citrus Mint Sparkle', 'Jus de citron vert (50%), Sirop de menthe (15%), Eau gazeuse (35%)', ''),
('Tropical Mint', 'Jus d\'ananas (50%), Jus de citron vert (20%), Sirop de menthe (10%), Eau gazeuse (20%)', ''),
('Pineapple Fizz', 'Jus d\'ananas (70%), Eau gazeuse (30%)', ''),
('Lemon Mint Cooler', 'Jus de citron vert (60%), Sirop de menthe (20%), Eau gazeuse (20%)', ''),
('Sparkling Mint', 'Jus de citron vert (40%), Sirop de menthe (20%), Eau gazeuse (40%)', '');

-- Mojito Virgin
UPDATE mocktails
SET ingredient_quantities = '{"citron_vert": 50, "sirop_menthe": 20, "eau_gazeuse": 30}'
WHERE name = 'Mojito Virgin';

-- Sunset Passion
UPDATE mocktails
SET ingredient_quantities = '{"ananas": 60, "citron_vert": 20, "eau_gazeuse": 20}'
WHERE name = 'Sunset Passion';

-- Berry Sparkler
UPDATE mocktails
SET ingredient_quantities = '{"ananas": 70, "citron_vert": 10, "eau_gazeuse": 20}'
WHERE name = 'Berry Sparkler';

-- Citrus Fizz
UPDATE mocktails
SET ingredient_quantities = '{"citron_vert": 60, "sirop_menthe": 10, "eau_gazeuse": 30}'
WHERE name = 'Citrus Fizz';

-- Tropical Breeze
UPDATE mocktails
SET ingredient_quantities = '{"ananas": 50, "citron_vert": 20, "eau_gazeuse": 30}'
WHERE name = 'Tropical Breeze';

-- Spicy Maple Cooler
UPDATE mocktails
SET ingredient_quantities = '{"ananas": 60, "citron_vert": 20, "sirop_menthe": 10, "eau_gazeuse": 10}'
WHERE name = 'Spicy Maple Cooler';

-- Minty Pineapple
UPDATE mocktails
SET ingredient_quantities = '{"ananas": 60, "sirop_menthe": 10, "eau_gazeuse": 30}'
WHERE name = 'Minty Pineapple';

-- Citrus Mint Sparkle
UPDATE mocktails
SET ingredient_quantities = '{"citron_vert": 50, "sirop_menthe": 15, "eau_gazeuse": 35}'
WHERE name = 'Citrus Mint Sparkle';

-- Tropical Mint
UPDATE mocktails
SET ingredient_quantities = '{"ananas": 50, "citron_vert": 20, "sirop_menthe": 10, "eau_gazeuse": 20}'
WHERE name = 'Tropical Mint';

-- Pineapple Fizz
UPDATE mocktails
SET ingredient_quantities = '{"ananas": 70, "eau_gazeuse": 30}'
WHERE name = 'Pineapple Fizz';

-- Lemon Mint Cooler
UPDATE mocktails
SET ingredient_quantities = '{"citron_vert": 60, "sirop_menthe": 20, "eau_gazeuse": 20}'
WHERE name = 'Lemon Mint Cooler';

-- Sparkling Mint
UPDATE mocktails
SET ingredient_quantities = '{"citron_vert": 40, "sirop_menthe": 20, "eau_gazeuse": 40}'
WHERE name = 'Sparkling Mint';




