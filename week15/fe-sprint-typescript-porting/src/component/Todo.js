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
function TodoProps(_a) {
    var todos = _a.todos, completeTodo = _a.completeTodo, removeTodo = _a.removeTodo;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: 'wrapper-todo' }, { children: todos.map(function (todo, index) {
            var todoClass = todo.isComplete ?
                'todo-row complete' :
                'todo-row';
            return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: todoClass }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ onClick: function () { return completeTodo(todo.id); } }, { children: todo.text }), todo.id), (0, jsx_runtime_1.jsx)("div", __assign({ className: "icons" }, { children: (0, jsx_runtime_1.jsx)("i", { className: "fas fa-times delete-icon", onClick: function () { return removeTodo(todo.id); } }) }))] }), index));
        }) })));
}
exports.default = TodoProps;
//# sourceMappingURL=Todo.js.map