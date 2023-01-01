"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoConvertBoolean = exports.commafy = exports.isPageNext = exports.getCurrentPageCount = exports.convertTimeToStr = exports.convertTime = exports.dateFormat = exports.zeroFill = exports.isComparePassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const ramda_1 = require("ramda");
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
    const s = n.toString();
    return s.length >= num_length
        ? s
        : new Array(num_length - s.length + 1).join('0') + n;
};
exports.zeroFill = zeroFill;
const dateFormat = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const monthStr = (0, exports.zeroFill)(month, 2);
    const dayStr = (0, exports.zeroFill)(day, 2);
    const hourStr = (0, exports.zeroFill)(hour, 2);
    const minuteStr = (0, exports.zeroFill)(minute, 2);
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
const getCurrentPageCount = (page, take) => {
    return (page - 1) * take;
};
exports.getCurrentPageCount = getCurrentPageCount;
const isPageNext = (page, take, total) => {
    return total > (0, ramda_1.multiply)(page, take);
};
exports.isPageNext = isPageNext;
const commafy = (num) => {
    const str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str.join('.');
};
exports.commafy = commafy;
const dtoConvertBoolean = (value) => {
    return value === 'true' || value === true || value === 1 || value === '1';
};
exports.dtoConvertBoolean = dtoConvertBoolean;
//# sourceMappingURL=index.js.map