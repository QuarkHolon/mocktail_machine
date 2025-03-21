CREATE TABLE consumer_events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  mocktail_id INT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mocktail_id) REFERENCES mocktails(id)
);

