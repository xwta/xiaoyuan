-- 校园零食售卖平台数据库设计

CREATE TABLE campus_school (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL COMMENT '校区名称',
  address VARCHAR(255) DEFAULT NULL COMMENT '校区地址',
  status TINYINT DEFAULT 1 COMMENT '状态：1启用 0禁用',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) COMMENT='校区表';

CREATE TABLE campus_building (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  campus_id BIGINT NOT NULL COMMENT '校区ID',
  name VARCHAR(100) NOT NULL COMMENT '宿舍楼名称',
  status TINYINT DEFAULT 1 COMMENT '状态：1启用 0禁用',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_campus_id (campus_id)
) COMMENT='宿舍楼表';

CREATE TABLE campus_agent (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  campus_id BIGINT NOT NULL COMMENT '校区ID',
  building_id BIGINT DEFAULT NULL COMMENT '主要服务宿舍楼ID',
  name VARCHAR(100) NOT NULL COMMENT '代理点名称',
  contact_name VARCHAR(50) DEFAULT NULL COMMENT '联系人',
  phone VARCHAR(30) DEFAULT NULL COMMENT '联系电话',
  pickup_address VARCHAR(255) DEFAULT NULL COMMENT '自提地址',
  commission_rate DECIMAL(5,2) DEFAULT 0.00 COMMENT '佣金比例，例如10表示10%',
  status TINYINT DEFAULT 1 COMMENT '状态：1启用 0禁用',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_campus_id (campus_id),
  INDEX idx_building_id (building_id)
) COMMENT='校园代理点表';

CREATE TABLE product_category (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL COMMENT '分类名称',
  sort_order INT DEFAULT 0 COMMENT '排序',
  status TINYINT DEFAULT 1 COMMENT '状态：1启用 0禁用',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) COMMENT='商品分类表';

CREATE TABLE product (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  category_id BIGINT NOT NULL COMMENT '分类ID',
  name VARCHAR(150) NOT NULL COMMENT '商品名称',
  cover_url VARCHAR(500) DEFAULT NULL COMMENT '商品主图',
  description TEXT COMMENT '商品描述',
  price DECIMAL(10,2) NOT NULL COMMENT '销售价',
  original_price DECIMAL(10,2) DEFAULT NULL COMMENT '原价',
  stock INT DEFAULT 0 COMMENT '库存',
  sales INT DEFAULT 0 COMMENT '销量',
  status TINYINT DEFAULT 1 COMMENT '状态：1上架 0下架',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category_id (category_id)
) COMMENT='商品表';

CREATE TABLE user_address (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL COMMENT '用户ID',
  campus_id BIGINT NOT NULL COMMENT '校区ID',
  building_id BIGINT NOT NULL COMMENT '宿舍楼ID',
  room_no VARCHAR(50) NOT NULL COMMENT '寝室号',
  contact_name VARCHAR(50) NOT NULL COMMENT '收货人',
  phone VARCHAR(30) NOT NULL COMMENT '手机号',
  is_default TINYINT DEFAULT 0 COMMENT '是否默认地址',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id)
) COMMENT='寝室收货地址表';

CREATE TABLE snack_order (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_no VARCHAR(64) NOT NULL UNIQUE COMMENT '订单号',
  user_id BIGINT NOT NULL COMMENT '用户ID',
  agent_id BIGINT DEFAULT NULL COMMENT '代理点ID',
  delivery_type VARCHAR(30) NOT NULL COMMENT '配送方式：dormitory送寝 pickup自提',
  campus_id BIGINT NOT NULL COMMENT '校区ID',
  building_id BIGINT DEFAULT NULL COMMENT '宿舍楼ID',
  room_no VARCHAR(50) DEFAULT NULL COMMENT '寝室号',
  contact_name VARCHAR(50) DEFAULT NULL COMMENT '收货人',
  phone VARCHAR(30) DEFAULT NULL COMMENT '手机号',
  total_amount DECIMAL(10,2) NOT NULL COMMENT '订单总额',
  pay_amount DECIMAL(10,2) NOT NULL COMMENT '实付金额',
  status VARCHAR(30) DEFAULT 'pending_pay' COMMENT '订单状态',
  remark VARCHAR(255) DEFAULT NULL COMMENT '备注',
  verify_code VARCHAR(20) DEFAULT NULL COMMENT '自提核销码',
  paid_at DATETIME DEFAULT NULL,
  completed_at DATETIME DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_agent_id (agent_id),
  INDEX idx_status (status)
) COMMENT='订单表';

CREATE TABLE snack_order_item (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL COMMENT '订单ID',
  product_id BIGINT NOT NULL COMMENT '商品ID',
  product_name VARCHAR(150) NOT NULL COMMENT '商品名称快照',
  product_cover VARCHAR(500) DEFAULT NULL COMMENT '商品图片快照',
  price DECIMAL(10,2) NOT NULL COMMENT '下单单价',
  quantity INT NOT NULL COMMENT '数量',
  total_amount DECIMAL(10,2) NOT NULL COMMENT '小计',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_order_id (order_id),
  INDEX idx_product_id (product_id)
) COMMENT='订单明细表';

CREATE TABLE agent_commission (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  agent_id BIGINT NOT NULL COMMENT '代理点ID',
  order_id BIGINT NOT NULL COMMENT '订单ID',
  order_amount DECIMAL(10,2) NOT NULL COMMENT '订单金额',
  commission_rate DECIMAL(5,2) NOT NULL COMMENT '佣金比例',
  commission_amount DECIMAL(10,2) NOT NULL COMMENT '佣金金额',
  status VARCHAR(30) DEFAULT 'pending' COMMENT '状态：pending待结算 settled已结算',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  settled_at DATETIME DEFAULT NULL,
  INDEX idx_agent_id (agent_id),
  INDEX idx_order_id (order_id)
) COMMENT='代理佣金表';
