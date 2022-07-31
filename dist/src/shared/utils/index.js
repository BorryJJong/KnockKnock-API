"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimeToStr = exports.convertTime = exports.dateFormat = exports.zeroFill = exports.isComparePassword = exports.hashPassword = void 0;
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
const zeroFill = (n, num_length) => {
    let s = n.toString();
    return s.length >= num_length ? s : new Array(num_length - s.length + 1).join('0') + n;
};
exports.zeroFill = zeroFill;
const dateFormat = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let monthStr = (0, exports.zeroFill)(month, 2);
    let dayStr = (0, exports.zeroFill)(day, 2);
    let hourStr = (0, exports.zeroFill)(hour, 2);
    let minuteStr = (0, exports.zeroFill)(minute, 2);
    return `${date.getFullYear()}.${monthStr}.${dayStr} ${hourStr}:${minuteStr}`;
};
exports.dateFormat = dateFormat;
const convertTime = (utc) => {
    return new Date(Date.parse(utc + ''));
};
exports.convertTime = convertTime;
const convertTimeToStr = (t) => {
    const now = new Date();
    const time = t;
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000 / 60);
    if (diff < 60) {
        return `${diff}분 전`;
    }
    const diffHour = Math.floor(diff / 60);
    if (diffHour < 24) {
        return `${diffHour}시간 전`;
    }
    const diffDay = Math.floor(diff / 60 / 24);
    if (diffDay < 2) {
        return `${diffDay}일 전`;
    }
    return (0, exports.dateFormat)(t);
};
exports.convertTimeToStr = convertTimeToStr;
//# sourceMappingURL=index.js.map