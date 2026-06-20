const agentScopeRepository = require('../repositories/agentScopeRepository');

async function findAgentForBuilding(buildingId) {
  const list = await agentScopeRepository.listByBuilding(buildingId);
  const available = list.filter(item => item.status !== 'closed');
  return available[0] || null;
}

async function buildDispatchInfo(orderData) {
  if (!orderData || !orderData.buildingId) {
    return { agent: null, reason: 'building missing' };
  }

  const agent = await findAgentForBuilding(orderData.buildingId);
  return {
    agent,
    reason: agent ? 'matched' : 'no agent matched'
  };
}

module.exports = {
  findAgentForBuilding,
  buildDispatchInfo
};
