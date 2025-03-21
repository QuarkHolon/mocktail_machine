CREATE TABLE iot_monitoring (
  id INT PRIMARY KEY AUTO_INCREMENT,
  bottle_1_id INT,
  bottle_2_id INT,
  bottle_3_id INT,
  bottle_4_id INT,
  temperature FLOAT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bottle_1_id) REFERENCES bottles(id),
  FOREIGN KEY (bottle_2_id) REFERENCES bottles(id),
  FOREIGN KEY (bottle_3_id) REFERENCES bottles(id),
  FOREIGN KEY (bottle_4_id) REFERENCES bottles(id)
);

