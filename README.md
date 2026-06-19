# 校园零食售卖平台小程序

一个面向高校场景的校园零食售卖平台，包含微信小程序学生端、校园代理点端、后端 API、Vue 管理后台和 MySQL 数据库脚本。

项目目标不是做一个空壳模板，而是围绕「学生下单 → 代理点履约 → 后台管理 → 数据库落地」形成可继续二开的 MVP 骨架。

## 一、项目能力

### 学生端小程序

- 首页商品展示
- 商品分类
- 购物车
- 确认订单
- 寝室配送
- 代理点自提
- 订单列表
- 订单详情
- 寝室地址管理
- 我的页面

### 校园代理点端

- 代理首页
- 今日订单 / 销售额 / 佣金概览
- 代理订单列表
- 代理订单详情
- 接单
- 完成订单
- 自提取货处理
- 库存查看
- 佣金中心

### 管理后台

- Vue + Vite + Element Plus
- 数据看板
- 商品管理
- 新增商品
- 编辑商品
- 商品上下架
- 商品移除
- 订单管理
- 订单状态修改
- 代理点管理
- 新增代理点
- 代理点启用 / 停用

### 后端服务

- Express API
- 模块化路由
- Repository 数据访问层
- mock 数据模式
- MySQL 数据模式
- 商品接口
- 订单接口
- 校区 / 宿舍楼 / 代理点接口
- 后台管理接口

## 二、目录结构

```text
miniprogram/   微信小程序端
server/        后端服务
admin/         管理后台
database/      数据库脚本
docs/          产品、接口、运行、联调文档
```

后端结构：

```text
server/src/
├── app.js
├── config/
│   └── appConfig.js
├── db/
│   └── index.js
├── mock/
│   └── store.js
├── repositories/
│   ├── productRepository.js
│   ├── orderRepository.js
│   └── campusRepository.js
└── routes/
    ├── products.js
    ├── campus.js
    ├── orders.js
    ├── agent.js
    ├── admin.js
    └── adminOverview.js
```

## 三、快速启动

### 方式一：本地启动

启动后端：

```bash
cd server
npm install
npm run dev
```

后端默认地址：

```text
http://localhost:3000
```

启动后台：

```bash
cd admin
npm install
npm run dev
```

后台默认地址：

```text
http://localhost:5173
```

微信小程序：

```text
使用微信开发者工具打开 miniprogram 目录
```

小程序接口配置：

```text
miniprogram/config/env.js
```

### 方式二：Docker 启动 MySQL + 后端

```bash
docker compose up -d
```

包含：

- MySQL 8.0
- 后端 server
- 自动执行 `database/mysql_init.sql`

## 四、数据库说明

数据库初始化脚本：

```text
database/mysql_init.sql
```

环境变量示例：

```text
server/.env.example
```

默认后端支持两种模式：

```text
DB_ENABLED=false 使用 mock 数据
DB_ENABLED=true  使用 MySQL
```

当前已支持数据库切换的模块：

- 商品
- 订单
- 校区
- 宿舍楼
- 代理点
- 后台概览

## 五、核心业务流程

```text
学生浏览商品
→ 加入购物车
→ 选择配送到寝室 / 代理点自提
→ 提交订单
→ 代理点接单
→ 配送完成 / 自提完成
→ 后台查看订单与运营数据
```

## 六、主要接口

### 商品

```text
GET /api/categories
GET /api/products
GET /api/products/:id
```

### 订单

```text
POST /api/orders
GET  /api/orders
GET  /api/orders/:id
```

### 校园基础数据

```text
GET /api/campuses
GET /api/buildings
GET /api/agents
```

### 代理点

```text
GET  /api/agent/summary
GET  /api/agent/orders
GET  /api/agent/stocks
GET  /api/agent/commissions
POST /api/agent/orders/:id/accept
POST /api/agent/orders/:id/delivered
POST /api/agent/orders/:id/verify
```

### 后台

```text
GET    /api/admin/overview
GET    /api/admin/products
POST   /api/admin/products
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id
GET    /api/admin/orders
PUT    /api/admin/orders/:id/status
GET    /api/admin/agents
POST   /api/admin/agents
PUT    /api/admin/agents/:id/status
```

## 七、当前版本定位

当前版本是可继续二开的 MVP 骨架，已经具备：

- 学生端主流程
- 代理端履约流程
- 后台管理基础能力
- 后端模块化结构
- MySQL 渐进式接入
- 数据库初始化脚本
- Docker 启动 MySQL + 后端

还不是直接商用上线版本。上线前仍需补齐：

- 微信登录
- 微信支付
- 管理后台登录鉴权
- 真实用户体系
- 订单搜索和分页
- 佣金结算
- 退款售后
- 生产环境部署配置

## 八、推荐开发顺序

```text
1. 本地跑通 mock 模式
2. 执行 mysql_init.sql
3. 开启 DB_ENABLED=true
4. 跑通商品和订单数据库读写
5. 接入微信登录
6. 接入微信支付
7. 完善后台权限
8. 上线前做安全和异常处理
```

## 九、相关文档

```text
docs/产品方案.md
docs/API接口设计.md
docs/运行说明.md
docs/前后端联调说明.md
docs/开发进度.md
docs/校园零食平台二开方案.md
database/README.md
```
