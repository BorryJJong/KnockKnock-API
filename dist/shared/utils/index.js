"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComparePassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const hashPassword = async (password) => {
    const saltRound = 10;
    const salt = await (0, bcrypt_1.genSalt)(saltRound);
    return await (0, bcrypt_1.hash)(password, salt);
};
exports.hashPassword = hashPassword;
const isComparePassword = async (password, hash) => {
    return await (0, bcrypt_1.compare)(password, hash);
};
exports.isComparePassword = isComparePassword;
//# sourceMappingURL=index.js.map