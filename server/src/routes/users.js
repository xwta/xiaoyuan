const express = require('express');
const userRepository = require('../repositories/userRepository');

const router = express.Router();

router.post('/users/login', async (req, res, next) => {
  try {
    const user = await userRepository.loginByCode(req.body.code);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

router.get('/users/:userId/addresses', async (req, res, next) => {
  try {
    const result = await userRepository.listAddresses(req.params.userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/users/:userId/addresses', async (req, res, next) => {
  try {
    const address = await userRepository.createAddress({
      ...req.body,
      userId: req.params.userId
    });
    res.json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
