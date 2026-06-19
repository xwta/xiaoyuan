# 数据库说明

## 1. 初始化脚本

当前提供两个数据库脚本：

```text
database/schema.sql
database/mysql_init.sql
```

建议优先使用：

```text
database/mysql_init.sql
```

它包含基础建库、建表和演示数据。

## 2. 初始化方式

进入 MySQL 后执行：

```sql
source database/mysql_init.sql;
```

或者在命令行执行：

```bash
mysql -u root -p < database/mysql_init.sql
```

## 3. 后端环境配置

复制环境变量示例：

```bash
cd server
cp .env.example .env
```

本地默认配置：

```text
PORT=3000
DB_ENABLED=false
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=campus_snack
```

开启数据库模式：

```text
DB_ENABLED=true
```

## 4. 当前已支持数据库切换的模块

已支持：

- 商品列表
- 商品详情
- 新增商品
- 编辑商品
- 移除商品
- 订单列表
- 订单详情
- 创建订单
- 修改订单状态
- 校区列表
- 宿舍楼列表
- 代理点列表
- 新增代理点
- 代理点状态修改

## 5. 当前策略

项目采用渐进式迁移：

```text
DB_ENABLED=false 使用演示数据
DB_ENABLED=true 使用 MySQL
```

这样做的好处是：

- 本地不装数据库也能跑 demo
- 接入数据库后可以逐步替换数据源
- 不会因为数据库配置错误导致整个项目无法启动

## 6. 后续建议

下一步建议继续补：

- 用户表数据访问层
- 地址表数据访问层
- 佣金表数据访问层
- 订单搜索和分页
- 后台登录鉴权
