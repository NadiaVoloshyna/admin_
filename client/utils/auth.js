export const auth = (ctx, role) => {
  let user;

  // Get logged in user
  if (ctx.req && ctx.req.isAuthenticated() && ctx.req.session.passport) {
    user = ctx.req.session.passport.user;
    ctx.store.dispatch({ type: 'SET_USER', payload: user });
  }

  if (ctx.req && !user) {
    ctx.res.writeHead(302, { Location: '/auth/login' })
    ctx.res.end()
    return;
  }

  return user;
}