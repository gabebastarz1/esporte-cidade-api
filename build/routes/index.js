"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.absencesRouter = exports.enrollmentRouter = exports.authRouter = exports.athleteRouter = exports.teacherRouter = exports.modalityRouter = exports.materialRouter = exports.managerRouter = void 0;
var manager_1 = require("./manager");
Object.defineProperty(exports, "managerRouter", { enumerable: true, get: function () { return __importDefault(manager_1).default; } });
var material_1 = require("./material");
Object.defineProperty(exports, "materialRouter", { enumerable: true, get: function () { return __importDefault(material_1).default; } });
var modality_1 = require("./modality");
Object.defineProperty(exports, "modalityRouter", { enumerable: true, get: function () { return __importDefault(modality_1).default; } });
var teacher_1 = require("./teacher");
Object.defineProperty(exports, "teacherRouter", { enumerable: true, get: function () { return __importDefault(teacher_1).default; } });
var userBase_1 = require("./userBase");
Object.defineProperty(exports, "athleteRouter", { enumerable: true, get: function () { return __importDefault(userBase_1).default; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var enrollment_1 = require("./enrollment");
Object.defineProperty(exports, "enrollmentRouter", { enumerable: true, get: function () { return __importDefault(enrollment_1).default; } });
var absences_1 = require("./absences");
Object.defineProperty(exports, "absencesRouter", { enumerable: true, get: function () { return __importDefault(absences_1).default; } });
//# sourceMappingURL=index.js.map