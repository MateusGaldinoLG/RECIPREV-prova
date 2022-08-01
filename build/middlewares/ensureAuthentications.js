"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureUser = exports.ensureAdmin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWTKey = 'RECIPREV';
function ensureUser(req, res, next) {
    const jwtoken = req.headers.authorization;
    if (!jwtoken) {
        return res.status(401).end();
    }
    const token = jwtoken.split(" ")[1];
    try {
        (0, jsonwebtoken_1.verify)(token, JWTKey);
        // req.user_id = sub;
    }
    catch (error) {
        return res.status(401).end();
    }
    return next();
}
exports.ensureUser = ensureUser;
function ensureAdmin(req, res, next) {
    const jwtoken = req.headers.authorization;
    // console.log(req);
    if (!jwtoken) {
        return res.status(401).json('No Token was Found');
    }
    const token = jwtoken.split(" ")[1];
    try {
        const { admin } = (0, jsonwebtoken_1.verify)(token, JWTKey);
        if (!admin) {
            return res.status(401).json('Not Admin');
        }
    }
    catch (error) {
        return res.status(401).end();
    }
    return next();
}
exports.ensureAdmin = ensureAdmin;
