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
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const data_source_1 = require("../../data-source");
const User_1 = require("../../entities/User");
class CreateUserService {
    execute({ id, email, password, is_admin }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(User_1.User).extend(User_1.User);
            const userAlreadyExists = yield userRepository.findOne({
                where: [
                    { email: email },
                ]
            });
            if (userAlreadyExists) {
                throw new Error(`Email ${email} already in use`);
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 8);
            if (typeof is_admin === 'undefined') {
                is_admin = false;
            }
            const user = userRepository.create({
                id,
                email,
                password: hashedPassword,
                is_admin: is_admin
            });
            yield userRepository.save(user);
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
