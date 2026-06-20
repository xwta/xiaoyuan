USE campus_snack;

CREATE TABLE IF NOT EXISTS flow_record (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  biz_id BIGINT NOT NULL,
  biz_no VARCHAR(64),
  from_value VARCHAR(32),
  to_value VARCHAR(32) NOT NULL,
  operator_kind VARCHAR(32) DEFAULT 'system',
  operator_id BIGINT DEFAULT 0,
  note_text VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
