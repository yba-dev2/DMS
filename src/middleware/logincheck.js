const requireAuth = (req, res, next) => {
	console.log(req.session.token);
  if (!req.session.userId) {
    // User is not authenticated, redirect to login page
    return res.redirect('/logout');
  }
  // User is authenticated, proceed to the next middleware
  next();
};
module.exports = {
  requireAuth,
}