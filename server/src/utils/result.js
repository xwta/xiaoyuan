function send(res, data) {
  res.json({ success: true, data });
}

module.exports = { send };
