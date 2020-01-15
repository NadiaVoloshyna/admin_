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

  // Get user from store on the client
  if (!ctx.req) {
    const state = ctx.store.getState();
    user = state.user.user;
  }

  return user;
}