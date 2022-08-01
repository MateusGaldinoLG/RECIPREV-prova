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
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/User/CreateUserService");
const uuid_1 = require("uuid");
class CreateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUserService = new CreateUserService_1.CreateUserService();
            const { email, password } = req.body;
            const admin = req.query ? ((req.query.admin + '').toLowerCase() === 'true') : undefined;
            const id = (0, uuid_1.v4)();
            // validations...
            const user = yield createUserService.execute({
                id,
                email,
                password,
                is_admin: admin
            });
            return res.status(201).json(user);
        });
    }
}
exports.CreateUserController = CreateUserController;
