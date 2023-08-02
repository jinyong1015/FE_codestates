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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var TodoForm = function (_a) {
    var onSubmit = _a.onSubmit;
    var _b = (0, react_1.useState)(''), input = _b[0], setInput = _b[1];
    var _c = (0, react_1.useState)(1), number = _c[0], setNumber = _c[1];
    var inputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    var handleChange = function (e) {
        setInput(e.currentTarget.value);
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        setNumber(function (prevNumber) { return prevNumber + 1; });
        onSubmit({
            id: number,
            text: input,
        });
        setInput('');
    };
    return ((0, jsx_runtime_1.jsxs)("form", __assign({ id: "todoForm", className: "todo-form", onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Add a todo", value: input, name: "text", className: "todo-input", onChange: handleChange, ref: inputRef }), (0, jsx_runtime_1.jsx)("button", __assign({ className: "todo-button" }, { children: "Add todo" }))] })));
};
exports.default = TodoForm;
//# sourceMappingURL=TodoForm.js.map