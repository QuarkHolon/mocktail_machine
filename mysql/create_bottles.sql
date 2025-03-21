CREATE TABLE bottles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location TINYINT UNSIGNED NOT NULL, -- Emplacement dans armoire réfrigérée
  current_level FLOAT NOT NULL, -- Taux de remplissage de 0.00 à 100.00
  is_active TINYINT(1) DEFAULT 1  -- 1 représente TRUE, 0 représente FALSE
);

