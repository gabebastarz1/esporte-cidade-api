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
exports.UserBase = void 0;
var typeorm_1 = require("typeorm");
var address_entity_1 = require("./address.entity");
var roles_enum_1 = require("../enums/roles.enum");
var UserBase = /** @class */ (function () {
    function UserBase() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserBase.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], UserBase.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], UserBase.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", length: 11, unique: false }) // CPF deve ser guardado sem formatação
        ,
        __metadata("design:type", String)
    ], UserBase.prototype, "cpf", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], UserBase.prototype, "rg", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], UserBase.prototype, "birthday", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], UserBase.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], UserBase.prototype, "photo_url", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { unique: true, nullable: true }),
        __metadata("design:type", String)
    ], UserBase.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return address_entity_1.Address; }, function (address) { return address.user; }, {
            eager: true,
        }),
        __metadata("design:type", Array)
    ], UserBase.prototype, "addresses", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", enum: roles_enum_1.Roles }),
        __metadata("design:type", Number)
    ], UserBase.prototype, "role", void 0);
    UserBase = __decorate([
        (0, typeorm_1.Entity)('user-base')
    ], UserBase);
    return UserBase;
}());
exports.UserBase = UserBase;
//# sourceMappingURL=user-base.entity.js.map