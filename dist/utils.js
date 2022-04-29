"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = {
    formatter: function humanize(str) {
        return str.trim().replace(/ /g, "_").toLocaleUpperCase();
    },
};
exports.default = utils;
