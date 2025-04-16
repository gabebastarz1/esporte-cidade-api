
const jwt = require('jsonwebtoken');

export const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "osn2in0nmx--!@34noxm", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};