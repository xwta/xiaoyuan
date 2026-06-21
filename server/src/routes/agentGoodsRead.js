const express = require('express');
const agentGoodsRepository = require('../repositories/agentGoodsRepository');
const { send } = require('../utils/result');

const router = express.Router();

router.get('/ops/goods', async (req, res, next) => {
  try {
    const data = await agentGoodsRepository.list(req.query.agentId || 1);
    send(res, data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
