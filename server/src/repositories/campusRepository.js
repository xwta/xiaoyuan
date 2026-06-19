const { campuses, buildings, agents } = require('../mock/store');
const { query, isDbEnabled } = require('../db');

function mapCampus(row) {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    status: row.status || 'on'
  };
}

function mapBuilding(row) {
  return {
    id: row.id,
    campusId: row.campus_id,
    name: row.name,
    status: row.status || 'on'
  };
}

function mapAgent(row) {
  return {
    id: row.id,
    campusId: row.campus_id,
    buildingId: row.building_id,
    name: row.name,
    pickupAddress: row.pickup_address,
    status: row.status || 'open'
  };
}

async function listCampuses() {
  if (isDbEnabled()) {
    const rows = await query('SELECT id, name, address, status FROM campus_school ORDER BY id ASC');
    return rows.map(mapCampus);
  }
  return campuses;
}

async function listBuildings(campusId) {
  if (isDbEnabled()) {
    const params = [];
    let sql = 'SELECT id, campus_id, name, status FROM campus_building';
    if (campusId) {
      sql += ' WHERE campus_id = ?';
      params.push(Number(campusId));
    }
    sql += ' ORDER BY id ASC';
    const rows = await query(sql, params);
    return rows.map(mapBuilding);
  }

  return buildings.filter(item => !campusId || item.campusId === Number(campusId));
}

async function listAgents(filters = {}) {
  if (isDbEnabled()) {
    const where = [];
    const params = [];

    if (filters.campusId) {
      where.push('campus_id = ?');
      params.push(Number(filters.campusId));
    }

    if (filters.buildingId) {
      where.push('building_id = ?');
      params.push(Number(filters.buildingId));
    }

    const sql = `
      SELECT id, campus_id, building_id, name, pickup_address, status
      FROM campus_agent
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
      ORDER BY id DESC
    `;
    const rows = await query(sql, params);
    return rows.map(mapAgent);
  }

  return agents.filter(item => {
    if (filters.campusId && item.campusId !== Number(filters.campusId)) return false;
    if (filters.buildingId && item.buildingId !== Number(filters.buildingId)) return false;
    return true;
  });
}

async function createAgent(data) {
  if (isDbEnabled()) {
    const result = await query(
      'INSERT INTO campus_agent (campus_id, building_id, name, pickup_address, status) VALUES (?, ?, ?, ?, ?)',
      [
        Number(data.campusId || 1),
        Number(data.buildingId || 1),
        data.name,
        data.pickupAddress,
        data.status || 'open'
      ]
    );
    const list = await listAgents();
    return list.find(item => item.id === result.insertId) || null;
  }

  const agent = {
    id: Date.now(),
    campusId: Number(data.campusId || 1),
    buildingId: Number(data.buildingId || 1),
    name: data.name,
    pickupAddress: data.pickupAddress,
    status: data.status || 'open'
  };
  agents.unshift(agent);
  return agent;
}

async function updateAgentStatus(id, status) {
  if (isDbEnabled()) {
    await query('UPDATE campus_agent SET status = ? WHERE id = ?', [status, Number(id)]);
    const list = await listAgents();
    return list.find(item => item.id === Number(id)) || null;
  }

  const agent = agents.find(item => item.id === Number(id));
  if (!agent) return null;
  agent.status = status || agent.status;
  return agent;
}

module.exports = {
  listCampuses,
  listBuildings,
  listAgents,
  createAgent,
  updateAgentStatus
};
