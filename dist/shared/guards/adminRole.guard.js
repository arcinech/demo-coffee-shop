"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerRoles = void 0;
const common_1 = require("@nestjs/common");
const roles_enums_1 = require("../enums/roles.enums");
let WorkerRoles = class WorkerRoles {
    canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const session = (_a = request === null || request === void 0 ? void 0 : request.session) === null || _a === void 0 ? void 0 : _a.user.role;
        if (session === roles_enums_1.Roles['ADMIN'] || session === roles_enums_1.Roles['SELLER']) {
            return request.isAuthenticated();
        }
        throw new common_1.UnauthorizedException();
    }
};
WorkerRoles = __decorate([
    (0, common_1.Injectable)()
], WorkerRoles);
exports.WorkerRoles = WorkerRoles;
//# sourceMappingURL=adminRole.guard.js.map