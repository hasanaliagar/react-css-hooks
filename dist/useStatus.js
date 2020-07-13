"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStatus = void 0;
var react_1 = require("react");
exports.useStatus = function (config) {
    var $root = document.querySelector(":root");
    var $rootStyles = getComputedStyle($root);
    var initialState = {};
    for (var _i = 0, _a = Object.entries(config); _i < _a.length; _i++) {
        var _b = _a[_i], prop = _b[0], _c = _b[1], key = _c.key, value = _c.value;
        var newValue = value !== null && value !== void 0 ? value : $rootStyles.getPropertyValue(key);
        // @ts-ignore
        initialState[prop] = newValue;
        $root.style.setProperty(key, newValue);
    }
    var _d = react_1.useState(initialState), state = _d[0], set = _d[1];
    return [
        state,
        function (cb) {
            var newState = cb(state);
            for (var _i = 0, _a = Object.entries(newState); _i < _a.length; _i++) {
                var _b = _a[_i], prop = _b[0], value = _b[1];
                // @ts-ignore
                var key = config[prop].key;
                // @ts-ignore
                $root.style.setProperty(key, value);
            }
            set(function (state) { return (__assign(__assign({}, state), newState)); });
            return state;
        },
    ];
};
exports.default = exports.useStatus;
