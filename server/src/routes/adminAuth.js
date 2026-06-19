const express = require('express');

const router = express.Router();

router.post('/admin/session', (req, res) => {
  const account = req.body.account || 'admin';
  const token = Buffer.from(`${account}:${Date.now()}`).toString('base64');

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: 1,
        account,
        name: '平台管理员',
        role: 'admin'
      }
    }
  });
});

router.get('/admin/session', (req, res) => {
  const token = req.headers.authorization || '';
  res.json({
    success: Boolean(token),
    data: {
      valid: Boolean(token)
    }
  });
});

module.exports = router;
