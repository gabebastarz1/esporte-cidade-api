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
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../database/config");
var athlete_entity_1 = require("../entities/athlete.entity");
var modality_entity_1 = require("../entities/modality.entity");
var atendiment_entity_1 = require("../entities/atendiment.entity");
var roles_enum_1 = require("../enums/roles.enum");
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var athleteRepo, modalityRepo, atendimentRepo, athlete, modalityNames, modalities, _i, modalityNames_1, name, modality, atendiments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, config_1.AppDataSource.initialize()];
                case 1:
                    _a.sent();
                    athleteRepo = config_1.AppDataSource.getRepository(athlete_entity_1.Athlete);
                    modalityRepo = config_1.AppDataSource.getRepository(modality_entity_1.Modality);
                    atendimentRepo = config_1.AppDataSource.getRepository(atendiment_entity_1.Atendiment);
                    return [4 /*yield*/, athleteRepo.findOneBy({ name: "João" })];
                case 2:
                    athlete = _a.sent();
                    if (!!athlete) return [3 /*break*/, 4];
                    athlete = athleteRepo.create({
                        name: "João",
                        password: "123456",
                        cpf: "12345678900",
                        birthday: "2005-01-01",
                        phone: "11999999999",
                        rg: "1234567",
                        role: roles_enum_1.Roles.ATHLETES,
                        father_name: "Pai do João",
                        mother_name: "Mãe do João",
                        responsible_person_name: "Responsável João",
                    });
                    return [4 /*yield*/, athleteRepo.save(athlete)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    modalityNames = ["Futebol", "Basquete", "Capoeira"];
                    modalities = [];
                    _i = 0, modalityNames_1 = modalityNames;
                    _a.label = 5;
                case 5:
                    if (!(_i < modalityNames_1.length)) return [3 /*break*/, 10];
                    name = modalityNames_1[_i];
                    return [4 /*yield*/, modalityRepo.findOneBy({ name: name })];
                case 6:
                    modality = _a.sent();
                    if (!!modality) return [3 /*break*/, 8];
                    modality = modalityRepo.create({
                        name: name,
                        description: "".concat(name, " para iniciantes"),
                        days_of_week: ["Segunda", "Quarta"],
                        start_time: "08:00",
                        end_time: "10:00",
                        class_locations: ["Quadra 1"],
                    });
                    return [4 /*yield*/, modalityRepo.save(modality)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    modalities.push(modality);
                    _a.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 5];
                case 10:
                    atendiments = atendimentRepo.create([
                        { athlete: athlete, modality: modalities[0], present: false }, // Futebol
                        { athlete: athlete, modality: modalities[0], present: true }, // Futebol
                        { athlete: athlete, modality: modalities[1], present: false }, // Basquete
                        { athlete: athlete, modality: modalities[2], present: true }, // Capoeira 
                        { athlete: athlete, modality: modalities[1], present: true }, // Basquete
                    ]);
                    return [4 /*yield*/, atendimentRepo.save(atendiments)];
                case 11:
                    _a.sent();
                    console.log("Seed inserido com sucesso!");
                    return [4 /*yield*/, config_1.AppDataSource.destroy()];
                case 12:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
seed().catch(function (error) {
    console.error("Erro ao rodar seed:", error);
    config_1.AppDataSource.destroy();
});
//# sourceMappingURL=seedAtendiments.js.map