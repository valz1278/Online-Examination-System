
exports.adminlogin = (req, res, next) => {
  try {
    if (!req.user) res.sendStatus(401);
    res.send(req.user);
  } catch (err) {
    next(err);
  }
};
