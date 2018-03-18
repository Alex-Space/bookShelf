const {User} = require('../models/user');

const auth = (req, res, next) => {
    const token = req.cookies.auth;

    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({
            error: true,
            message: 'Trying logout, but there is no user!'
        });

        req.token = token;
        req.user = user;
        next();
    });
};

module.exports = {auth};