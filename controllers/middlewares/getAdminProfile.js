const getAdminProfile = async (req, res, next) => {
    if (req.session.admin) {
        res.locals.admin = req.session.admin; 
    }
    next();
};

module.exports = getAdminProfile;
