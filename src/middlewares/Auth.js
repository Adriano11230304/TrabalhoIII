const jwt = require('jsonwebtoken');
const isAuth = (req, res, next) => {
    jwt.verify(req.headers.token, 'publicKey', function (err, decoded) {
        if (err) {
            res.status(400).json('Token inválido!');
        } else {
            req.headers.user = decoded.user;
            next();
        }
    });
};

module.exports = { isAuth };