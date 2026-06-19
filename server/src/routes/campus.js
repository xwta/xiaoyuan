const express = require('express');
const campusRepository = require('../repositories/campusRepository');

const router = express.Router();

router.get('/campuses', async (req, res, next) => {
  try {
    const result = await campusRepository.listCampuses();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/buildings', async (req, res, next) => {
  try {
    const result = await campusRepository.listBuildings(req.query.campusId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/agents', async (req, res, next) => {
  try {
    const result = await campusRepository.listAgents({
      campusId: req.query.campusId,
      buildingId: req.query.buildingId
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
