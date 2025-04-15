"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Athlete = void 0;
var typeorm_1 = require("typeorm");
var user_base_entity_1 = require("./user-base.entity");
var atendiment_entity_1 = require("./atendiment.entity");
var enrollment_entity_1 = require("./enrollment.entity");
var Athlete = /** @class */ (function (_super) {
    __extends(Athlete, _super);
    function Athlete() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true, default: "Nenhum nome informado" }),
        __metadata("design:type", String)
    ], Athlete.prototype, "father_name", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Athlete.prototype, "father_phone", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Athlete.prototype, "father_cpf", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Athlete.prototype, "father_email", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true, default: "Nenhum nome informado" }),
        __metadata("design:type", String)
    ], Athlete.prototype, "mother_name", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Athlete.prototype, "mother_phone", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Athlete.prototype, "mother_cpf", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Athlete.prototype, "mother_email", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true, default: "Nenhum responsável informado" }),
        __metadata("design:type", String)
    ], Athlete.prototype, "responsible_person_name", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Athlete.prototype, "responsible_person_email", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Athlete.prototype, "responsible_person_cpf", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", {
            nullable: true,
            default: "Nenhum tipo sanguíneo informado",
        }),
        __metadata("design:type", String)
    ], Athlete.prototype, "blood_type", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Athlete.prototype, "photo_url_cpf_front", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Athlete.prototype, "photo_url_cpf_back", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true, default: "Nenhuma alergia informada" }),
        __metadata("design:type", String)
    ], Athlete.prototype, "allergy", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return atendiment_entity_1.Atendiment; }, function (a) { return a.athlete; }),
        __metadata("design:type", Array)
    ], Athlete.prototype, "atendiments", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return enrollment_entity_1.Enrollment; }, function (e) { return e.athlete; }),
        __metadata("design:type", Array)
    ], Athlete.prototype, "enrollments", void 0);
    Athlete = __decorate([
        (0, typeorm_1.Entity)("athlete")
    ], Athlete);
    return Athlete;
}(user_base_entity_1.UserBase));
exports.Athlete = Athlete;
//# sourceMappingURL=athlete.entity.js.map