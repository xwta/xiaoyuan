const { query, isDbEnabled } = require('../db');

const mockRecords = [];

async function add(data) {
  const record = {
    id: Date.now(),
    bizId: Number(data.bizId || 0),
    bizNo: data.bizNo || '',
    fromValue: data.fromValue || '',
    toValue: data.toValue || '',
    operatorKind: data.operatorKind || 'system',
    operatorId: Number(data.operatorId || 0),
    noteText: data.noteText || ''
  };

  if (isDbEnabled()) {
    await query(
      `INSERT INTO flow_record
       (biz_id, biz_no, from_value, to_value, operator_kind, operator_id, note_text)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        record.bizId,
        record.bizNo,
        record.fromValue,
        record.toValue,
        record.operatorKind,
        record.operatorId,
        record.noteText
      ]
    );
  } else {
    mockRecords.unshift(record);
  }

  return record;
}

async function listByBiz(bizId) {
  if (isDbEnabled()) {
    const rows = await query(
      `SELECT id, biz_id, biz_no, from_value, to_value, operator_kind, operator_id, note_text, created_at
       FROM flow_record WHERE biz_id = ? ORDER BY id DESC`,
      [Number(bizId)]
    );
    return rows.map(row => ({
      id: row.id,
      bizId: row.biz_id,
      bizNo: row.biz_no,
      fromValue: row.from_value,
      toValue: row.to_value,
      operatorKind: row.operator_kind,
      operatorId: row.operator_id,
      noteText: row.note_text,
      createdAt: row.created_at
    }));
  }

  return mockRecords.filter(item => item.bizId === Number(bizId));
}

module.exports = {
  add,
  listByBiz
};
