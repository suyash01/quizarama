const jwt = require('jsonwebtoken');

module.exports = {
    authenticateUser: function(req, res, next){
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET);
            if(decoded.access === 3){
                req.user = decoded;
                next();
            }
            else
                return res.status(401).json({
                    status: 0,
                    error: "Not Authorized"
                });
        } catch (err) {
            return res.status(500).json({
                status: 0,
                error: "Internal server error"
            });
        }
    },

    authenticateMod: function(req, res, next){
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET);
            if(decoded.access === 2)
                next();
            else
                return res.status(401).json({
                    status: 0,
                    error: "Not Authorized"
                });
        } catch (err) {
            return res.status(500).json({
                status: 0,
                error: "Internal server error"
            });
        }
    },

    authenticateAdmin: function(req, res, next){
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET);
            if(decoded.access === 1){
                req.user = decoded;
                next();
            }
            else
                return res.status(401).json({
                    status: 0,
                    error: "Not Authorized"
                });
        } catch (err) {
            return res.status(500).json({
                status: 0,
                error: "Internal server error"
            });
        }
    },

    authenticateAll: function(req, res, next){
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET);
            if(decoded){
                req.user = decoded;
                next();
            }
            else
                return res.status(401).json({
                    status: 0,
                    error: "Not Authorized"
                });
        } catch (err) {
            return res.status(500).json({
                status: 0,
                error: "Internal server error"
            });
        }
    }
}