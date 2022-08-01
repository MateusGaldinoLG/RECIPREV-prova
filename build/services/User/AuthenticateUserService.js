"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const data_source_1 = require("../../data-source");
const User_1 = require("../../entities/User");
const JWTKey = 'RECIPREV';
class AuthenticateUserService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(User_1.User).extend(User_1.User);
            const user = yield userRepository.findOne({
                where: [
                    { email: email }
                ]
            });
            if (!user) {
                throw new Error('Incorrect Email/Password');
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new Error('Incorrect Email/Password');
            }
            const token = (0, jsonwebtoken_1.sign)({
                email: user.email,
                admin: user.is_admin
            }, JWTKey, {
                subject: user.id,
                expiresIn: "1d"
            });
            return token;
        });
    }
}
exports.AuthenticateUserService = AuthenticateUserService;
