export const canVisit = (ctx, role) => {
  const { req, isServer } = ctx;

  // Get logged in user
  if (isServer 
    && req.isAuthenticated() 
    && req.session.passport
    && req.session.passport.user
    && req.session.passport.user.role !== role) {
    return 400;
  }

  return null;
}