"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modality = void 0;
var typeorm_1 = require("typeorm");
var teacher_entity_1 = require("./teacher.entity");
var enrollment_entity_1 = require("./enrollment.entity");
var atendiment_entity_1 = require("./atendiment.entity");
var Modality = /** @class */ (function () {
    function Modality() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Modality.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Modality.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Modality.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", array: true }),
        __metadata("design:type", Array)
    ], Modality.prototype, "days_of_week", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "time" }),
        __metadata("design:type", String)
    ], Modality.prototype, "start_time", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "time" }),
        __metadata("design:type", String)
    ], Modality.prototype, "end_time", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", array: true }),
        __metadata("design:type", Array)
    ], Modality.prototype, "class_locations", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return teacher_entity_1.Teacher; }, function (teacher) { return teacher.modality; }, {
            onDelete: "SET NULL",
        }),
        __metadata("design:type", Array)
    ], Modality.prototype, "teachers", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return atendiment_entity_1.Atendiment; }, function (a) { return a.modality; }),
        __metadata("design:type", Array)
    ], Modality.prototype, "atendiments", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return enrollment_entity_1.Enrollment; }, function (e) { return e.modality; }),
        __metadata("design:type", Array)
    ], Modality.prototype, "enrollments", void 0);
    Modality = __decorate([
        (0, typeorm_1.Entity)("modality")
    ], Modality);
    return Modality;
}());
exports.Modality = Modality;
//# sourceMappingURL=modality.entity.js.map