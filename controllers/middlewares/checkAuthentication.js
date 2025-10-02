const checkAuthentication = (req, res, next) => {
  if (req.path === '/admin_login' || req.path === '/login_admin') {
    return next();
  }
  if (req.path === '/admin_accounts' || req.path === '/user_account') {
    if (!req.session.admin.super) {
      req.flash('message', 'Devi essere super admin per accedere a questa pagina');
      res.redirect('/dashboard');
    }
  }
  if (req.session.isLoggedIn) {
    next();
  } else {
    req.flash('message', 'Devi loggarti per accedere a questa pagina');
    res.redirect('/admin_login');
  }
}

module.exports = checkAuthentication;