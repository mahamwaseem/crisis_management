const router = require('express').Router;

router.post('/login', (req, res) => {
  res.send('login success');
});

router.post('/signup', (req, res) => {
  res.semd('signup success');
});
module.exports = router;