const express = require('express');
const flowRecordRepository = require('../repositories/flowRecordRepository');
const { send } = require('../utils/result');

const router = express.Router();

router.get('/ops/records/:bizId', async (req, res, next) => {
  try {
    const data = await flowRecordRepository.listByBiz(req.params.bizId);
    send(res, data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
