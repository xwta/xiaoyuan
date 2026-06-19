const express = require('express');
const { campuses, buildings, agents } = require('../mock/store');

const router = express.Router();

router.get('/campuses', (req, res) => {
  res.json(campuses);
});

router.get('/buildings', (req, res) => {
  const campusId = Number(req.query.campusId);
  const result = buildings.filter(item => !campusId || item.campusId === campusId);
  res.json(result);
});

router.get('/agents', (req, res) => {
  const campusId = Number(req.query.campusId);
  const buildingId = Number(req.query.buildingId);

  const result = agents.filter(item => {
    if (campusId && item.campusId !== campusId) return false;
    if (buildingId && item.buildingId !== buildingId) return false;
    return true;
  });

  res.json(result);
});

module.exports = router;
