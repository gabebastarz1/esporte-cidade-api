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
exports.PopulandoAtendimentos1744736183628 = void 0;
var PopulandoAtendimentos1744736183628 = /** @class */ (function () {
    function PopulandoAtendimentos1744736183628() {
        this.name = 'PopulandoAtendimentos1744736183628';
    }
    PopulandoAtendimentos1744736183628.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"address\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"state\" text NOT NULL, \"city\" text NOT NULL, \"neighborhood\" text NOT NULL, \"street\" text NOT NULL, \"number\" integer NOT NULL, \"complement\" text NOT NULL, \"references\" text NOT NULL, \"userId\" integer)")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"user-base\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"name\" text NOT NULL, \"password\" text NOT NULL, \"cpf\" text(11) NOT NULL, \"rg\" text, \"birthday\" text NOT NULL, \"phone\" text NOT NULL, \"photo_url\" text, \"email\" text, \"role\" varchar CHECK( \"role\" IN ('1','2','3') ) NOT NULL, CONSTRAINT \"UQ_0dfb99b20ad3c8c6b1f16eae4db\" UNIQUE (\"email\"))")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"atendiment\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"created_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"present\" boolean NOT NULL, \"modalityId\" integer, \"athleteId\" integer)")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"athlete\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"name\" text NOT NULL, \"password\" text NOT NULL, \"cpf\" text(11) NOT NULL, \"rg\" text, \"birthday\" text NOT NULL, \"phone\" text NOT NULL, \"photo_url\" text, \"email\" text, \"role\" varchar CHECK( \"role\" IN ('1','2','3') ) NOT NULL, \"father_name\" text DEFAULT ('Nenhum nome informado'), \"father_phone\" text, \"father_cpf\" text, \"father_email\" text, \"mother_name\" text DEFAULT ('Nenhum nome informado'), \"mother_phone\" text, \"mother_cpf\" text, \"mother_email\" text, \"responsible_person_name\" text DEFAULT ('Nenhum respons\u00E1vel informado'), \"responsible_person_email\" text, \"responsible_person_cpf\" text, \"blood_type\" text DEFAULT ('Nenhum tipo sangu\u00EDneo informado'), \"photo_url_cpf_front\" text, \"photo_url_cpf_back\" text, \"allergy\" text DEFAULT ('Nenhuma alergia informada'), CONSTRAINT \"UQ_6b605cd9ed2fc11b50677fc8f2d\" UNIQUE (\"email\"))")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"enrollment\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"active\" boolean NOT NULL DEFAULT (0), \"aproved\" boolean NOT NULL DEFAULT (0), \"created_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"updated_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"athleteId\" integer, \"modalityId\" integer)")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"modality\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"name\" text NOT NULL, \"description\" text NOT NULL, \"days_of_week\" text array NOT NULL, \"start_time\" time NOT NULL, \"end_time\" time NOT NULL, \"class_locations\" text array NOT NULL)")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"teacher\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"name\" text NOT NULL, \"password\" text NOT NULL, \"cpf\" text(11) NOT NULL, \"rg\" text, \"birthday\" text NOT NULL, \"phone\" text NOT NULL, \"photo_url\" text, \"email\" text, \"role\" varchar CHECK( \"role\" IN ('1','2','3') ) NOT NULL, \"about\" text NOT NULL, \"modalityId\" integer, CONSTRAINT \"UQ_00634394dce7677d531749ed8e8\" UNIQUE (\"email\"))")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"material\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"name\" text NOT NULL, \"description\" text DEFAULT ('Sem descri\u00E7\u00E3o'), \"quantity\" integer NOT NULL DEFAULT (0))")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"manager\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"name\" text NOT NULL, \"password\" text NOT NULL, \"cpf\" text(11) NOT NULL, \"rg\" text, \"birthday\" text NOT NULL, \"phone\" text NOT NULL, \"photo_url\" text, \"email\" text, \"role\" varchar CHECK( \"role\" IN ('1','2','3') ) NOT NULL, CONSTRAINT \"UQ_ee8fba4edb704ce2465753a2edd\" UNIQUE (\"email\"))")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"release\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"title\" text NOT NULL, \"content\" text NOT NULL, \"priority\" varchar CHECK( \"priority\" IN ('HIGH','LOW') ) NOT NULL DEFAULT ('LOW'), \"created_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP))")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"documentation\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"title\" text NOT NULL, \"description\" text NOT NULL, \"created_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"updated_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP))")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"temporary_address\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"state\" text NOT NULL, \"city\" text NOT NULL, \"neighborhood\" text NOT NULL, \"street\" text NOT NULL, \"number\" integer NOT NULL, \"complement\" text NOT NULL, \"references\" text NOT NULL, \"userId\" integer, CONSTRAINT \"FK_d25f1ea79e282cc8a42bd616aa3\" FOREIGN KEY (\"userId\") REFERENCES \"user-base\" (\"id\") ON DELETE CASCADE ON UPDATE NO ACTION)")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("INSERT INTO \"temporary_address\"(\"id\", \"state\", \"city\", \"neighborhood\", \"street\", \"number\", \"complement\", \"references\", \"userId\") SELECT \"id\", \"state\", \"city\", \"neighborhood\", \"street\", \"number\", \"complement\", \"references\", \"userId\" FROM \"address\"")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"address\"")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"temporary_address\" RENAME TO \"address\"")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"temporary_atendiment\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"created_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"present\" boolean NOT NULL, \"modalityId\" integer, \"athleteId\" integer, CONSTRAINT \"FK_94559c147b79dc19928622c55a3\" FOREIGN KEY (\"modalityId\") REFERENCES \"modality\" (\"id\") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT \"FK_549c5e59022f9902b94afefd420\" FOREIGN KEY (\"athleteId\") REFERENCES \"athlete\" (\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("INSERT INTO \"temporary_atendiment\"(\"id\", \"created_at\", \"present\", \"modalityId\", \"athleteId\") SELECT \"id\", \"created_at\", \"present\", \"modalityId\", \"athleteId\" FROM \"atendiment\"")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"atendiment\"")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"temporary_atendiment\" RENAME TO \"atendiment\"")];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"temporary_enrollment\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"active\" boolean NOT NULL DEFAULT (0), \"aproved\" boolean NOT NULL DEFAULT (0), \"created_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"updated_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"athleteId\" integer, \"modalityId\" integer, CONSTRAINT \"FK_9da60bd721aae7b35c89b448751\" FOREIGN KEY (\"athleteId\") REFERENCES \"athlete\" (\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT \"FK_df014b705a2c5dff9da9ba54c54\" FOREIGN KEY (\"modalityId\") REFERENCES \"modality\" (\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("INSERT INTO \"temporary_enrollment\"(\"id\", \"active\", \"aproved\", \"created_at\", \"updated_at\", \"athleteId\", \"modalityId\") SELECT \"id\", \"active\", \"aproved\", \"created_at\", \"updated_at\", \"athleteId\", \"modalityId\" FROM \"enrollment\"")];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"enrollment\"")];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"temporary_enrollment\" RENAME TO \"enrollment\"")];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"temporary_teacher\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"name\" text NOT NULL, \"password\" text NOT NULL, \"cpf\" text(11) NOT NULL, \"rg\" text, \"birthday\" text NOT NULL, \"phone\" text NOT NULL, \"photo_url\" text, \"email\" text, \"role\" varchar CHECK( \"role\" IN ('1','2','3') ) NOT NULL, \"about\" text NOT NULL, \"modalityId\" integer, CONSTRAINT \"UQ_00634394dce7677d531749ed8e8\" UNIQUE (\"email\"), CONSTRAINT \"FK_316b0a548186c8ff19da65676f9\" FOREIGN KEY (\"modalityId\") REFERENCES \"modality\" (\"id\") ON DELETE SET NULL ON UPDATE NO ACTION)")];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("INSERT INTO \"temporary_teacher\"(\"id\", \"name\", \"password\", \"cpf\", \"rg\", \"birthday\", \"phone\", \"photo_url\", \"email\", \"role\", \"about\", \"modalityId\") SELECT \"id\", \"name\", \"password\", \"cpf\", \"rg\", \"birthday\", \"phone\", \"photo_url\", \"email\", \"role\", \"about\", \"modalityId\" FROM \"teacher\"")];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"teacher\"")];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"temporary_teacher\" RENAME TO \"teacher\"")];
                    case 27:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PopulandoAtendimentos1744736183628.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"teacher\" RENAME TO \"temporary_teacher\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"teacher\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"name\" text NOT NULL, \"password\" text NOT NULL, \"cpf\" text(11) NOT NULL, \"rg\" text, \"birthday\" text NOT NULL, \"phone\" text NOT NULL, \"photo_url\" text, \"email\" text, \"role\" varchar CHECK( \"role\" IN ('1','2','3') ) NOT NULL, \"about\" text NOT NULL, \"modalityId\" integer, CONSTRAINT \"UQ_00634394dce7677d531749ed8e8\" UNIQUE (\"email\"))")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("INSERT INTO \"teacher\"(\"id\", \"name\", \"password\", \"cpf\", \"rg\", \"birthday\", \"phone\", \"photo_url\", \"email\", \"role\", \"about\", \"modalityId\") SELECT \"id\", \"name\", \"password\", \"cpf\", \"rg\", \"birthday\", \"phone\", \"photo_url\", \"email\", \"role\", \"about\", \"modalityId\" FROM \"temporary_teacher\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"temporary_teacher\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"enrollment\" RENAME TO \"temporary_enrollment\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"enrollment\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"active\" boolean NOT NULL DEFAULT (0), \"aproved\" boolean NOT NULL DEFAULT (0), \"created_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"updated_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"athleteId\" integer, \"modalityId\" integer)")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("INSERT INTO \"enrollment\"(\"id\", \"active\", \"aproved\", \"created_at\", \"updated_at\", \"athleteId\", \"modalityId\") SELECT \"id\", \"active\", \"aproved\", \"created_at\", \"updated_at\", \"athleteId\", \"modalityId\" FROM \"temporary_enrollment\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"temporary_enrollment\"")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"atendiment\" RENAME TO \"temporary_atendiment\"")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"atendiment\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"created_at\" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"present\" boolean NOT NULL, \"modalityId\" integer, \"athleteId\" integer)")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("INSERT INTO \"atendiment\"(\"id\", \"created_at\", \"present\", \"modalityId\", \"athleteId\") SELECT \"id\", \"created_at\", \"present\", \"modalityId\", \"athleteId\" FROM \"temporary_atendiment\"")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"temporary_atendiment\"")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"address\" RENAME TO \"temporary_address\"")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"address\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"state\" text NOT NULL, \"city\" text NOT NULL, \"neighborhood\" text NOT NULL, \"street\" text NOT NULL, \"number\" integer NOT NULL, \"complement\" text NOT NULL, \"references\" text NOT NULL, \"userId\" integer)")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("INSERT INTO \"address\"(\"id\", \"state\", \"city\", \"neighborhood\", \"street\", \"number\", \"complement\", \"references\", \"userId\") SELECT \"id\", \"state\", \"city\", \"neighborhood\", \"street\", \"number\", \"complement\", \"references\", \"userId\" FROM \"temporary_address\"")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"temporary_address\"")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"documentation\"")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"release\"")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"manager\"")];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"material\"")];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"teacher\"")];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"modality\"")];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"enrollment\"")];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"athlete\"")];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"atendiment\"")];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"user-base\"")];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"address\"")];
                    case 27:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PopulandoAtendimentos1744736183628;
}());
exports.PopulandoAtendimentos1744736183628 = PopulandoAtendimentos1744736183628;
//# sourceMappingURL=1744736183628-populando-atendimentos.js.map