# API 接口设计

## 商品接口

### 获取商品分类

```http
GET /api/categories
```

### 获取商品列表

```http
GET /api/products?categoryId=1&keyword=饮料
```

### 获取商品详情

```http
GET /api/products/:id
```

## 购物车接口

### 添加购物车

```http
POST /api/cart/items
```

请求体：

```json
{
  "productId": 1,
  "quantity": 2
}
```

### 获取购物车

```http
GET /api/cart
```

## 订单接口

### 创建订单

```http
POST /api/orders
```

请求体：

```json
{
  "deliveryType": "dormitory",
  "campusId": 1,
  "buildingId": 2,
  "roomNo": "602",
  "agentId": 1,
  "items": [
    { "productId": 1, "quantity": 2 }
  ],
  "remark": "放门口即可"
}
```

`deliveryType` 可选：

- `dormitory`：配送到寝室
- `pickup`：代理点自提

### 获取订单列表

```http
GET /api/orders
```

### 获取订单详情

```http
GET /api/orders/:id
```

### 取消订单

```http
POST /api/orders/:id/cancel
```

## 校园接口

### 获取校区

```http
GET /api/campuses
```

### 获取宿舍楼

```http
GET /api/buildings?campusId=1
```

### 获取可用代理点

```http
GET /api/agents?campusId=1&buildingId=2
```

## 代理点接口

### 代理点订单列表

```http
GET /api/agent/orders
```

### 代理点接单

```http
POST /api/agent/orders/:id/accept
```

### 确认配送完成

```http
POST /api/agent/orders/:id/delivered
```

### 自提核销

```http
POST /api/agent/orders/:id/verify
```

请求体：

```json
{
  "verifyCode": "836291"
}
```

## 管理后台接口

### 商品管理

```http
POST /api/admin/products
PUT /api/admin/products/:id
DELETE /api/admin/products/:id
```

### 代理点管理

```http
POST /api/admin/agents
PUT /api/admin/agents/:id
DELETE /api/admin/agents/:id
```

### 订单管理

```http
GET /api/admin/orders
PUT /api/admin/orders/:id/status
```
