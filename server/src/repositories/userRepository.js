const { query, isDbEnabled } = require('../db');

const mockUsers = [
  { id: 1, openid: 'mock_openid_001', nickname: '校园同学', avatarUrl: '', phone: '' }
];

const mockAddresses = [
  {
    id: 1,
    userId: 1,
    campusId: 1,
    campusName: '第一校区',
    buildingId: 1,
    buildingName: '6号楼',
    roomNo: '602',
    contactName: '张同学',
    phone: '13800000000',
    isDefault: true
  }
];

function mapUser(row) {
  return {
    id: row.id,
    openid: row.openid,
    nickname: row.nickname,
    avatarUrl: row.avatar_url || '',
    phone: row.phone || ''
  };
}

function mapAddress(row) {
  return {
    id: row.id,
    userId: row.user_id,
    campusId: row.campus_id,
    campusName: row.campus_name,
    buildingId: row.building_id,
    buildingName: row.building_name,
    roomNo: row.room_no,
    contactName: row.contact_name,
    phone: row.phone,
    isDefault: Boolean(row.is_default)
  };
}

async function loginByCode(code) {
  const openid = code ? `mock_${code}` : 'mock_openid_001';

  if (isDbEnabled()) {
    const rows = await query('SELECT id, openid, nickname, avatar_url, phone FROM app_user WHERE openid = ? LIMIT 1', [openid]);
    if (rows[0]) return mapUser(rows[0]);

    const result = await query(
      'INSERT INTO app_user (openid, nickname, avatar_url, phone) VALUES (?, ?, ?, ?)',
      [openid, '校园同学', '', '']
    );
    const userRows = await query('SELECT id, openid, nickname, avatar_url, phone FROM app_user WHERE id = ?', [result.insertId]);
    return mapUser(userRows[0]);
  }

  let user = mockUsers.find(item => item.openid === openid);
  if (!user) {
    user = { id: Date.now(), openid, nickname: '校园同学', avatarUrl: '', phone: '' };
    mockUsers.unshift(user);
  }
  return user;
}

async function listAddresses(userId = 1) {
  if (isDbEnabled()) {
    const rows = await query(
      `SELECT id, user_id, campus_id, campus_name, building_id, building_name,
       room_no, contact_name, phone, is_default
       FROM user_address WHERE user_id = ? ORDER BY is_default DESC, id DESC`,
      [Number(userId)]
    );
    return rows.map(mapAddress);
  }

  return mockAddresses.filter(item => item.userId === Number(userId));
}

async function createAddress(data) {
  const userId = Number(data.userId || 1);

  if (isDbEnabled()) {
    const result = await query(
      `INSERT INTO user_address
       (user_id, campus_id, campus_name, building_id, building_name, room_no, contact_name, phone, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        Number(data.campusId || 1),
        data.campusName || '第一校区',
        Number(data.buildingId || 1),
        data.buildingName || '6号楼',
        data.roomNo,
        data.contactName,
        data.phone,
        data.isDefault ? 1 : 0
      ]
    );
    const list = await listAddresses(userId);
    return list.find(item => item.id === result.insertId) || null;
  }

  const address = {
    id: Date.now(),
    userId,
    campusId: Number(data.campusId || 1),
    campusName: data.campusName || '第一校区',
    buildingId: Number(data.buildingId || 1),
    buildingName: data.buildingName || '6号楼',
    roomNo: data.roomNo,
    contactName: data.contactName,
    phone: data.phone,
    isDefault: Boolean(data.isDefault)
  };
  mockAddresses.unshift(address);
  return address;
}

module.exports = {
  loginByCode,
  listAddresses,
  createAddress
};
