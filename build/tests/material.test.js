"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_test_1 = require("node:test");
var app_1 = __importDefault(require("../app"));
var supertest_1 = __importDefault(require("supertest"));
(0, node_test_1.beforeEach)(function () { });
node_test_1.describe.skip("Testing the Material router", function () {
    (0, node_test_1.describe)("GET request", function () {
        (0, node_test_1.it)("should throw an error when requesting an invalid ID", function () {
            (0, supertest_1.default)(app_1.default)
                .get("/api/material/-1")
                .expect("Content-Type", /json/)
                .expect(400)
                .end(function (err, res) {
                if (err)
                    throw err;
            });
        });
    });
    (0, node_test_1.describe)("POST request", function () {
        (0, node_test_1.it)("should create a new material with correct data", function () {
        });
    });
});
//# sourceMappingURL=material.test.js.map