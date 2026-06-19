CREATE DATABASE IF NOT EXISTS campus_snack DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE campus_snack;

CREATE TABLE IF NOT EXISTS product_category (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64) NOT NULL,
  sort_order INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'on',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS product (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  category_id BIGINT NOT NULL,
  name VARCHAR(128) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock INT NOT NULL DEFAULT 0,
  status VARCHAR(20) DEFAULT 'on',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS campus_school (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(128) NOT NULL,
  address VARCHAR(255),
  status VARCHAR(20) DEFAULT 'on',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS campus_building (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  campus_id BIGINT NOT NULL,
  name VARCHAR(128) NOT NULL,
  status VARCHAR(20) DEFAULT 'on',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS campus_agent (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  campus_id BIGINT NOT NULL,
  building_id BIGINT NOT NULL,
  name VARCHAR(128) NOT NULL,
  pickup_address VARCHAR(255),
  status VARCHAR(20) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS snack_order (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_no VARCHAR(64) NOT NULL UNIQUE,
  status VARCHAR(32) NOT NULL,
  status_text VARCHAR(32) NOT NULL,
  delivery_type VARCHAR(32),
  delivery_text VARCHAR(32),
  building_name VARCHAR(128),
  room_no VARCHAR(64),
  contact_name VARCHAR(64),
  phone VARCHAR(32),
  product_amount DECIMAL(10,2) DEFAULT 0.00,
  delivery_fee DECIMAL(10,2) DEFAULT 0.00,
  pay_amount DECIMAL(10,2) DEFAULT 0.00,
  pickup_code VARCHAR(16),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS snack_order_item (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT,
  product_name VARCHAR(128),
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(10,2) DEFAULT 0.00,
  total_amount DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO product_category (id, name, sort_order, status) VALUES
  (1, '饮料水饮', 1, 'on'),
  (2, '泡面速食', 2, 'on'),
  (3, '薯片零食', 3, 'on'),
  (4, '宿舍日用', 4, 'on')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO product (id, category_id, name, price, stock, status) VALUES
  (1, 1, '可乐 500ml', 3.00, 100, 'on'),
  (2, 1, '矿泉水', 2.00, 200, 'on'),
  (3, 2, '桶装泡面', 5.50, 80, 'on'),
  (4, 3, '薯片', 6.90, 60, 'on'),
  (5, 4, '抽纸', 4.90, 120, 'on')
ON DUPLICATE KEY UPDATE name = VALUES(name), price = VALUES(price), stock = VALUES(stock);

INSERT INTO campus_school (id, name, address, status) VALUES
  (1, '第一校区', '校内', 'on')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO campus_building (id, campus_id, name, status) VALUES
  (1, 1, '6号楼', 'on'),
  (2, 1, '8号楼', 'on')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO campus_agent (id, campus_id, building_id, name, pickup_address, status) VALUES
  (1, 1, 1, '6号楼校园代理点', '6号楼一楼大厅旁', 'open')
ON DUPLICATE KEY UPDATE name = VALUES(name), pickup_address = VALUES(pickup_address);
