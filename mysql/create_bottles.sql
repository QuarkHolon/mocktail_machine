-- Initialisation des bouteilles d'ingrédients liquides dans l'armoire réfrigérée connectée
CREATE TABLE bottles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location TINYINT UNSIGNED NOT NULL, -- Emplacement dans armoire réfrigérée, 1, 2 3 ou 4
  current_level FLOAT NOT NULL, -- Taux de remplissage de 0.00 à 100.00 %, à mettre àjour à chaque consommation
  is_active TINYINT(1) DEFAULT 1  -- 1 représente TRUE, 0 représente FALSE
);

INSERT INTO bottles (name, location, current_level, is_active) VALUES
('citron_vert', 1, 75, 1),
('sirop_menthe', 2, 80, 1),
('ananas', 3, 65, 1),
('eau_gazeuse', 4, 90, 1),
('pomme', NULL, 50, 0),
('sirop_grenadine', NULL, 40, 0),
('lait_coco', NULL, 30, 0),
('cranberry', NULL, 20, 0);


