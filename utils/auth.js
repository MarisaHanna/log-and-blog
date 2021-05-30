const withAuth = (req, res, next) => {
  
    if (!req.session.loggedIn) {
        res.redirect('/alert');
    
    } else {
      next();
    }
  };
  
  module.exports = withAuth;