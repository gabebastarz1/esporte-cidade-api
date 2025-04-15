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
var teacher_entity_1 = require("../entities/teacher.entity");
var config_1 = require("../database/config");
var node_assert_1 = require("node:assert");
var roles_enum_1 = require("../enums/roles.enum");
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var BASE_URL = "/api/teacher/";
(0, node_test_1.before)(function () { return __awaiter(void 0, void 0, void 0, function () {
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
                return [2 /*return*/];
        }
    });
}); });
(0, node_test_1.beforeEach)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var teacherRepository, teachers, _i, teachers_1, teacher;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                teacherRepository = config_1.AppDataSource.getRepository(teacher_entity_1.Teacher);
                return [4 /*yield*/, teacherRepository.clear()];
            case 1:
                _a.sent();
                teachers = [
                    {
                        name: "Professor Alice",
                        password: "password123",
                        cpf: "12345678901",
                        rg: "12345678",
                        birthday: "1980-03-10",
                        phone: "+5511987654321",
                        photo_url: "https://example.com/photos/teacheralice.jpg",
                        email: "teacheralice-".concat(Date.now(), "@example.com"),
                        about: "Instrutora experiente de yoga.",
                        modality: 1,
                        role: roles_enum_1.Roles.TEACHER,
                    },
                    {
                        name: "Professor Bob",
                        password: "securepassword789",
                        cpf: "98765432100",
                        rg: "87654321",
                        birthday: "1975-06-20",
                        phone: "+5511976543210",
                        photo_url: "https://example.com/photos/teacherbob.jpg",
                        email: "teacherbob-".concat(Date.now(), "@example.com"),
                        about: "Treinador de natação com mais de 10 anos de experiência.",
                        modality: 1,
                        role: roles_enum_1.Roles.TEACHER,
                    },
                ];
                _i = 0, teachers_1 = teachers;
                _a.label = 2;
            case 2:
                if (!(_i < teachers_1.length)) return [3 /*break*/, 5];
                teacher = teachers_1[_i];
                return [4 /*yield*/, teacherRepository.save(teacher)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); });
(0, node_test_1.after)(function () { return __awaiter(void 0, void 0, void 0, function () {
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
(0, node_test_1.describe)("Testing the Teacher router", function () {
    (0, node_test_1.describe)("GET request", function () {
        (0, node_test_1.it)("should get all teachers", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .get(BASE_URL)
                            .expect("Content-Type", /json/)
                            .expect(200)];
                    case 1:
                        res = _a.sent();
                        node_assert_1.strict.ok(Array.isArray(res.body), "Response should be an array of teachers");
                        return [2 /*return*/];
                }
            });
        }); });
        (0, node_test_1.it)("should return error for invalid ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .get("".concat(BASE_URL, "-1"))
                            .expect("Content-Type", /json/)
                            .expect(404)];
                    case 1:
                        res = _a.sent();
                        node_assert_1.strict.strictEqual(res.status, 404, "Response should return 404 for invalid ID");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, node_test_1.describe)("POST request", function () {
        (0, node_test_1.it)("should create a new teacher with correct data", function () { return __awaiter(void 0, void 0, void 0, function () {
            var newTeacher, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newTeacher = {
                            name: "Teacher Charlie",
                            password: "newsecurepassword123",
                            cpf: "22233344455",
                            rg: "55667788",
                            birthday: "1990-01-01",
                            phone: "+5511999999999",
                            photo_url: "https://example.com/photos/teachercharlie.jpg",
                            email: "teachercharlie@example.com",
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .post(BASE_URL)
                                .send(newTeacher)
                                .expect("Content-Type", /json/)
                                .expect(201)];
                    case 1:
                        res = _a.sent();
                        node_assert_1.strict.ok(res.body.id, "Response should contain the ID of the new teacher");
                        node_assert_1.strict.strictEqual(res.body.name, newTeacher.name, "Teacher name does not match");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, node_test_1.describe)("DELETE request", function () {
        (0, node_test_1.it)("should delete a teacher", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tempTeacher, createRes, teacherId, deleteRes, getRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempTeacher = {
                            name: "Teacher Delete",
                            password: "tempsecurepassword123",
                            cpf: "55566677788",
                            rg: "11223344",
                            birthday: "1985-08-25",
                            phone: "+5511988888888",
                            photo_url: "https://example.com/photos/tempteacher.jpg",
                            email: "tempteacher@example.com",
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .post(BASE_URL)
                                .send(tempTeacher)
                                .expect(201)];
                    case 1:
                        createRes = _a.sent();
                        teacherId = createRes.body.id;
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .delete("".concat(BASE_URL).concat(teacherId))
                                .expect(200)];
                    case 2:
                        deleteRes = _a.sent();
                        node_assert_1.strict.strictEqual(deleteRes.status, 200, "Delete status should be 200");
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .get("".concat(BASE_URL).concat(teacherId))
                                .expect(404)];
                    case 3:
                        getRes = _a.sent();
                        node_assert_1.strict.strictEqual(getRes.status, 404, "Deleted teacher should return 404");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, node_test_1.describe)("PUT request", function () {
        (0, node_test_1.it)("should update the teacher details", function () { return __awaiter(void 0, void 0, void 0, function () {
            var tempTeacher, createRes, teacherId, updatedTeacher, updateRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempTeacher = {
                            name: "Teacher Update",
                            password: "oldpassword123",
                            cpf: "11122334455",
                            rg: "11223344",
                            birthday: "1985-07-01",
                            phone: "+5511998887777",
                            photo_url: "https://example.com/photos/oldteacher.jpg",
                            email: "oldteacher@example.com",
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .post(BASE_URL)
                                .send(tempTeacher)
                                .expect(201)];
                    case 1:
                        createRes = _a.sent();
                        teacherId = createRes.body.id;
                        updatedTeacher = {
                            name: "Updated Teacher",
                            password: "newpassword123",
                            phone: "+5511999999999",
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                                .put("".concat(BASE_URL).concat(teacherId))
                                .send(updatedTeacher)
                                .expect(200)];
                    case 2:
                        updateRes = _a.sent();
                        node_assert_1.strict.strictEqual(updateRes.body.name, updatedTeacher.name, "Name was not updated correctly");
                        node_assert_1.strict.strictEqual(updateRes.body.phone, updatedTeacher.phone, "Phone was not updated correctly");
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=teacher.test.js.map