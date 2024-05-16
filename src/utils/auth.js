function isAuthorized(req, res, next) {
  if (req.user) {
    // console.log("User is logged in");
    next();
  } else {
    res.redirect('/');
  }
}

function isNotAuthorized(req, res, next) {
  if (req.user) {
    // console.log("User is logged in");
    res.redirect('/success');
  } else {
    next();
  }
}

module.exports = {
  isAuthorized,
  isNotAuthorized,
};
