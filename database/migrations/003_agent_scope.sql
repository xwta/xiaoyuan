USE campus_snack;

CREATE TABLE IF NOT EXISTS agent_building_scope (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  agent_id BIGINT NOT NULL,
  campus_id BIGINT NOT NULL,
  building_id BIGINT NOT NULL,
  priority_level INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'on',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_agent_building (agent_id, building_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO agent_building_scope (agent_id, campus_id, building_id, priority_level, status) VALUES
  (1, 1, 1, 10, 'on'),
  (1, 1, 2, 5, 'on')
ON DUPLICATE KEY UPDATE priority_level = VALUES(priority_level), status = VALUES(status);
