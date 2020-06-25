module.exports = (router) => {
  /**
   * Logout user
   */
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
  });
};
