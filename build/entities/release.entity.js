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
exports.Release = void 0;
var priority_enum_1 = require("../enums/priority.enum");
var typeorm_1 = require("typeorm");
var Release = /** @class */ (function () {
    function Release() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Release.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Release.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Release.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", enum: priority_enum_1.Priority, default: priority_enum_1.Priority.LOW }),
        __metadata("design:type", String)
    ], Release.prototype, "priority", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "date", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Release.prototype, "created_at", void 0);
    Release = __decorate([
        (0, typeorm_1.Entity)('release')
    ], Release);
    return Release;
}());
exports.Release = Release;
//# sourceMappingURL=release.entity.js.map