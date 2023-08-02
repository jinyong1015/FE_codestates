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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var TodoForm_1 = __importDefault(require("./component/TodoForm"));
var Todo_1 = __importDefault(require("./component/Todo"));
var react_1 = require("react");
require("./todos.css");
function Todos() {
    var _a = (0, react_1.useState)([]), todos = _a[0], setTodos = _a[1];
    var addTodo = function (todo) {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        var newTodos = __spreadArray([todo], todos, true);
        setTodos(newTodos);
    };
    var removeTodo = function (id) {
        var removeArr = todos.filter(function (todo) { return todo.id !== id; });
        setTodos(removeArr);
    };
    var completeTodo = function (id) {
        var completedTodo = todos.map(function (todo) {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(completedTodo);
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "todo-app" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "To Do List" }), (0, jsx_runtime_1.jsx)("h2", { children: "\uC624\uB298\uC740 \uBB34\uC2A8 \uC77C\uC744 \uACC4\uD68D\uD558\uB098\uC694?" }), (0, jsx_runtime_1.jsx)(TodoForm_1.default, { onSubmit: addTodo }), (0, jsx_runtime_1.jsx)(Todo_1.default, { todos: todos, completeTodo: completeTodo, removeTodo: removeTodo })] })) }));
}
exports.default = Todos;
//# sourceMappingURL=App.js.map