const { query, isDbEnabled } = require('../db');
const { agentGoods } = require('../mock/store');

async function list(agentId = 1) {
  if (isDbEnabled()) {
    const rows = await query(
      `SELECT id, agent_id, product_id, count_num, warning_num, status
       FROM agent_product_count WHERE agent_id = ? ORDER BY id DESC`,
      [Number(agentId)]
    );
    return rows.map(row => ({
      id: row.id,
      agentId: row.agent_id,
      productId: row.product_id,
      count: row.count_num,
      warningCount: row.warning_num,
      status: row.status
    }));
  }

  return agentGoods;
}

module.exports = {
  list
};
