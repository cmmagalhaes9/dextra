const { Router } = require('express');
const passport = require('passport');
const router = Router();
const { isAuthorized, isNotAuthorized } = require('../utils/auth');

router.get('/', isNotAuthorized, passport.authenticate('discord'));

router.get(
  '/redirect',
  isNotAuthorized,
  passport.authenticate('discord', {
    failureRedirect: '/', //other you could use are /forbiddent,/failure, etc
    successRedirect: '/success',
  })
);

module.exports = router;
