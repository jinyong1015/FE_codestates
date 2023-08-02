"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var react_test_renderer_1 = __importDefault(require("react-test-renderer"));
var App_1 = __importDefault(require("../App"));
var TodoForm_1 = __importDefault(require("../component/TodoForm"));
var Todo_1 = __importDefault(require("../component/Todo"));
var node_child_process_1 = require("node:child_process");
describe("App rendering Event", function () {
    test("App component has class name: todo-app", function () {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {})).container;
        var todoClass = container.querySelector(".todo-app");
        expect(todoClass).toBeTruthy();
        expect(todoClass).toBeInstanceOf(HTMLDivElement);
    });
    test("App component has child component: TodoForm", function () {
        var appInstance = react_test_renderer_1.default.create((0, jsx_runtime_1.jsx)(App_1.default, {})).root;
        expect(appInstance.findByType(TodoForm_1.default).type).toBe(TodoForm_1.default);
    });
    test("App component has child component: Todo", function () {
        var appInstance = react_test_renderer_1.default.create((0, jsx_runtime_1.jsx)(App_1.default, {})).root;
        expect(appInstance.findByType(Todo_1.default).type).toBe(Todo_1.default);
    });
});
describe("No TypeScript Error", function () {
    test("Should not have TypeScript Errors", function () {
        // Execute the command and capture the output
        expect(function () {
            try {
                var output = (0, node_child_process_1.execSync)("tsc --project ./tsconfig.json", {
                    encoding: "utf-8",
                });
                expect(output).not.toContain("error");
            }
            catch (e) {
                console.error(e);
                throw "\uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8\uFE0F \uD0C0\uC785\uC2A4\uD06C\uB9BD\uD2B8 \uC5D0\uB7EC\uAC00 \uC5C6\uB294\uC9C0 \uD655\uC778\uD558\uC138\uC694. \uD83D\uDEA8\uD83D\uDEA8\uD83D\uDEA8";
            }
        }).not.toThrow();
    });
});
//# sourceMappingURL=App.test.js.map