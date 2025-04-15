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
var express_1 = __importDefault(require("express"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var config_1 = require("../database/config");
var manager_entity_1 = require("../entities/manager.entity");
var roles_enum_1 = require("../enums/roles.enum");
var router = express_1.default.Router();
var managerRepository = config_1.AppDataSource.getRepository(manager_entity_1.Manager);
router
    .get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var managers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, managerRepository.find()];
            case 1:
                managers = _a.sent();
                res.json(managers);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Erro ao buscar gerentes:", error_1.message);
                console.error(error_1.stack);
                res.status(500).json({ message: "Erro ao buscar gerentes.", error: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var managerId, manager, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                managerId = parseInt(req.params.id, 10);
                if (isNaN(managerId)) {
                    return [2 /*return*/, res.status(400).json("ID de gerente inválido.")];
                }
                return [4 /*yield*/, managerRepository.findOneBy({ id: managerId })];
            case 1:
                manager = _a.sent();
                if (!manager) {
                    return [2 /*return*/, res.status(404).json("Gerente não encontrado.")];
                }
                res.status(200).json(manager);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Erro ao buscar gerente:", error_2);
                res.status(500).json("Erro ao buscar gerente.");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword, manager, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 10)];
            case 1:
                hashedPassword = _a.sent();
                manager = managerRepository.create(__assign(__assign({}, req.body), { password: hashedPassword, role: roles_enum_1.Roles.MANAGER }));
                return [4 /*yield*/, managerRepository.save(manager)];
            case 2:
                _a.sent();
                res.status(201).json(manager);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Erro ao criar gerente:", error_3);
                res.status(500).json("Erro ao criar gerente.");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })
    .put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var managerId, manager, _a, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                managerId = parseInt(req.params.id, 10);
                if (isNaN(managerId)) {
                    return [2 /*return*/, res.status(400).json("ID de gerente inválido.")];
                }
                return [4 /*yield*/, managerRepository.findOneBy({ id: managerId })];
            case 1:
                manager = _b.sent();
                if (!manager) {
                    return [2 /*return*/, res.status(404).json("Gerente não encontrado.")];
                }
                manager.name = req.body.name || manager.name;
                manager.cpf = req.body.cpf || manager.cpf;
                manager.rg = req.body.rg || manager.rg;
                manager.birthday = req.body.birthday || manager.birthday;
                manager.phone = req.body.phone || manager.phone;
                manager.photo_url = req.body.photo_url || manager.photo_url;
                manager.email = req.body.email || manager.email;
                if (!req.body.password) return [3 /*break*/, 3];
                _a = manager;
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 10)];
            case 2:
                _a.password = _b.sent();
                _b.label = 3;
            case 3: return [4 /*yield*/, managerRepository.save(manager)];
            case 4:
                _b.sent();
                res.status(200).json(manager);
                return [3 /*break*/, 6];
            case 5:
                error_4 = _b.sent();
                console.error("Erro ao atualizar gerente:", error_4);
                res.status(500).json("Erro ao atualizar gerente.");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); })
    .delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var managerId, manager, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                managerId = parseInt(req.params.id, 10);
                if (isNaN(managerId)) {
                    return [2 /*return*/, res.status(400).json("ID de gerente inválido.")];
                }
                return [4 /*yield*/, managerRepository.findOneBy({ id: managerId })];
            case 1:
                manager = _a.sent();
                if (!manager) {
                    return [2 /*return*/, res.status(404).json("Gerente não encontrado.")];
                }
                return [4 /*yield*/, managerRepository.remove(manager)];
            case 2:
                _a.sent();
                res.status(200).json("Gerente deletado com sucesso.");
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error("Erro ao deletar gerente:", error_5);
                res.status(500).json("Erro ao deletar gerente.");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=manager.js.map