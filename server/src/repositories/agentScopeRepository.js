const { query, isDbEnabled } = require('../db');
const { agents } = require('../mock/store');

async function listByBuilding(buildingId) {
  if (isDbEnabled()) {
    const rows = await query(
      `SELECT s.agent_id, s.campus_id, s.building_id, s.priority_level, a.name, a.pickup_address, a.status
       FROM agent_building_scope s
       LEFT JOIN campus_agent a ON a.id = s.agent_id
       WHERE s.building_id = ? AND s.status = 'on'
       ORDER BY s.priority_level DESC, s.id ASC`,
      [Number(buildingId)]
    );

    return rows.map(row => ({
      agentId: row.agent_id,
      campusId: row.campus_id,
      buildingId: row.building_id,
      priorityLevel: row.priority_level,
      name: row.name,
      pickupAddress: row.pickup_address,
      status: row.status
    }));
  }

  return agents
    .filter(item => item.buildingId === Number(buildingId))
    .map(item => ({
      agentId: item.id,
      campusId: item.campusId,
      buildingId: item.buildingId,
      priorityLevel: 0,
      name: item.name,
      pickupAddress: item.pickupAddress,
      status: item.status
    }));
}

module.exports = {
  listByBuilding
};
