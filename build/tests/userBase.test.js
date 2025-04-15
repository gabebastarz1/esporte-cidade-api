"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_test_1 = require("node:test");
var node_assert_1 = require("node:assert");
var user_base_entity_1 = require("../entities/user-base.entity");
var config_1 = require("src/database/config");
var app_1 = __importDefault(require("../app"));
var supertest_1 = __importDefault(require("supertest"));
var roles_enum_1 = require("src/enums/roles.enum");
var BASE_URL = "/api/userbase/";
(0, node_test_1.beforeEach)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, _i, users_1, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!config_1.AppDataSource.isInitialized) return [3 /*break*/, 2];
                return [4 /*yield*/, config_1.AppDataSource.destroy()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4 /*yield*/, config_1.AppDataSource.initialize()];
            case 3:
                _a.sent();
                return [4 /*yield*/, config_1.AppDataSource.getRepository(user_base_entity_1.UserBase).clear()];
            case 4:
                _a.sent();
                users = [
                    {
                        name: "Jane Doe",
                        password: "securepassword456",
                        cpf: "98765432100",
                        rg: "87654321",
                        birthday: "1985-05-15",
                        phone: "+5511987654321",
                        photo_url: "https://example.com/photos/janedoe.jpg",
                        email: "janedoe-".concat(Date.now(), "@example.com"),
                        role: roles_enum_1.Roles.ATHLETES
                    },
                    {
                        name: "Old User",
                        password: "oldpassword123",
                        cpf: "12312312345",
                        rg: "12345678",
                        birthday: "1995-05-05",
                        phone: "+5511988888888",
                        photo_url: "https://example.com/photos/olduser.jpg",
                        email: "olduser-".concat(Date.now(), "@example.com"),
                        role: roles_enum_1.Roles.MANAGER
                    }
                ];
                _i = 0, users_1 = users;
                _a.label = 5;
            case 5:
                if (!(_i < users_1.length)) return [3 /*break*/, 8];
                user = users_1[_i];
                return [4 /*yield*/, config_1.AppDataSource.getRepository(user_base_entity_1.UserBase).save(user)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8: return [2 /*return*/];
        }
    });
}); });
(0, node_test_1.afterEach)(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!config_1.AppDataSource.isInitialized) return [3 /*break*/, 2];
                return [4 /*yield*/, config_1.AppDataSource.destroy()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
(0, node_test_1.describe)("Testing the User Base router", function () {
    (0, node_test_1.describe)("GET request", function () {
        (0, node_test_1.it)("should get all users", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .get(BASE_URL)
                            .expect("Content-Type", /json/)
                            .expect(200)];
                    case 1:
                        res = _a.sent();
                        node_assert_1.strict.ok(Array.isArray(res.body), "Resposta deveria ser um array de usuários");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, node_test_1.it)("should return error for invalid ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .get("/api/userbase/-1")
                            .expect("Content-Type", /json/)
                            .expect(404)];
                    case 1:
                        res = _a.sent();
                        node_assert_1.strict.strictEqual(res.status, 404, "Resposta deveria retornar código 400 para ID inválido");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, node_test_1.describe)("POST request", function () {
        (0, node_test_1.it)("should create a new user with correct data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var newUser, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newUser = {
                            name: "Jane Doe",
                            password: "securepassword456",
                            cpf: "98765432100",
                            rg: "87654321",
                            birthday: "1985-05-15",
                            phone: "+5511987654321",
                            photo_url: "https://example.com/photos/janedoe.jpg",
                            email: "janedoe@example.com"
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .post(BASE_URL)
                                .send(newUser)
                                .expect("Content-Type", /json/)
                                .expect(201)];
                    case 1:
                        res = _a.sent();
                        node_assert_1.strict.ok(res.body.id, "Resposta deveria conter o ID do novo usuário");
                        node_assert_1.strict.strictEqual(res.body.name, newUser.name, "Nome do usuário não corresponde");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, node_test_1.describe)("DELETE request", function () {
        (0, node_test_1.it)("should delete the user", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tempUser, createRes, userId, deleteRes, getRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempUser = {
                            name: "Temporary User",
                            password: "tempassword123",
                            cpf: "11122334455",
                            rg: "12345678",
                            birthday: "2000-01-01",
                            phone: "+5511999999999",
                            photo_url: "https://example.com/photos/tempuser.jpg",
                            email: "tempuser@example.com"
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .post(BASE_URL)
                                .send(tempUser)
                                .expect(201)];
                    case 1:
                        createRes = _a.sent();
                        userId = createRes.body.id;
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .delete("/api/userbase/".concat(userId))
                                .expect(200)];
                    case 2:
                        deleteRes = _a.sent();
                        node_assert_1.strict.strictEqual(deleteRes.status, 200, "Status de exclusão deveria ser 200");
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .get("/api/userbase/".concat(userId))
                                .expect(404)];
                    case 3:
                        getRes = _a.sent();
                        node_assert_1.strict.strictEqual(getRes.status, 404, "Usuário excluído deveria retornar 404");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, node_test_1.describe)("PUT request", function () {
        (0, node_test_1.it)("should update the user details", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tempUser, createRes, userId, updatedUser, updateRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempUser = {
                            name: "Old User",
                            password: "oldpassword123",
                            cpf: "12312312345",
                            rg: "12345678",
                            birthday: "1995-05-05",
                            phone: "+5511988888888",
                            photo_url: "https://example.com/photos/olduser.jpg",
                            email: "olduser@example.com"
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .post(BASE_URL)
                                .send(tempUser)
                                .expect(201)];
                    case 1:
                        createRes = _a.sent();
                        userId = createRes.body.id;
                        updatedUser = {
                            name: "Updated User",
                            password: "newpassword123",
                            phone: "+5511990000000"
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .put("/api/userbase/".concat(userId))
                                .send(updatedUser)
                                .expect(200)];
                    case 2:
                        updateRes = _a.sent();
                        node_assert_1.strict.strictEqual(updateRes.body.name, updatedUser.name, "Nome não foi atualizado corretamente");
                        node_assert_1.strict.strictEqual(updateRes.body.phone, updatedUser.phone, "Telefone não foi atualizado corretamente");
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=userBase.test.js.map