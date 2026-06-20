USE campus_snack;

CREATE TABLE IF NOT EXISTS agent_product_count (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  agent_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  count_num INT NOT NULL DEFAULT 0,
  warning_num INT NOT NULL DEFAULT 0,
  status VARCHAR(20) DEFAULT 'on',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_agent_product (agent_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO agent_product_count (agent_id, product_id, count_num, warning_num, status) VALUES
  (1, 1, 30, 5, 'on'),
  (1, 2, 50, 10, 'on'),
  (1, 3, 20, 5, 'on')
ON DUPLICATE KEY UPDATE count_num = VALUES(count_num), warning_num = VALUES(warning_num);
