const express = require('express');
const campusRepository = require('../repositories/campusRepository');
const { send } = require('../utils/result');

const router = express.Router();

router.get('/ops/areas', async (req, res, next) => {
  try {
    const data = await campusRepository.listCampuses();
    send(res, data);
  } catch (error) {
    next(error);
  }
});

router.get('/ops/blocks', async (req, res, next) => {
  try {
    const data = await campusRepository.listBuildings(req.query.areaId || req.query.campusId);
    send(res, data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
