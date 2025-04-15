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
exports.Enrollment = void 0;
var typeorm_1 = require("typeorm");
var athlete_entity_1 = require("./athlete.entity");
var modality_entity_1 = require("./modality.entity");
var Enrollment = /** @class */ (function () {
    function Enrollment() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Enrollment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], Enrollment.prototype, "active", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], Enrollment.prototype, "aproved", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "date", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Enrollment.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "date", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Enrollment.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return athlete_entity_1.Athlete; }),
        __metadata("design:type", athlete_entity_1.Athlete)
    ], Enrollment.prototype, "athlete", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return modality_entity_1.Modality; }),
        __metadata("design:type", modality_entity_1.Modality)
    ], Enrollment.prototype, "modality", void 0);
    Enrollment = __decorate([
        (0, typeorm_1.Entity)("enrollment")
    ], Enrollment);
    return Enrollment;
}());
exports.Enrollment = Enrollment;
//# sourceMappingURL=enrollment.entity.js.map