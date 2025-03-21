


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



