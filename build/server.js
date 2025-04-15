"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var app_1 = __importDefault(require("./app"));
var env_1 = __importDefault(require("./environment/env"));
var port = env_1.default.APP_PORT ? env_1.default.APP_PORT : 5173;
app_1.default.listen(port, function () {
    console.log("\uD83D\uDE80 Servidor rodando: http://localhost:".concat(port, "\n"));
});
//# sourceMappingURL=server.js.map