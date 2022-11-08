"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToDate = exports.dateToArray = void 0;
const dateToArray = (date) => {
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ];
};
exports.dateToArray = dateToArray;
const arrayToDate = (array) => {
    return new Date(array[0], array[1], array[2], array[3], array[4], array[5]);
};
exports.arrayToDate = arrayToDate;
//# sourceMappingURL=date.helper.js.map