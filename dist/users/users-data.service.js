"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDataService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./db/user.entity");
const data_source_1 = require("../db/data-source");
const roles_enums_1 = require("../shared/enums/roles.enums");
let UsersDataService = class UsersDataService {
    async addUser(newUser) {
        return data_source_1.dataSource.transaction(async (manager) => {
            const userToSave = new user_entity_1.User();
            userToSave.email = newUser.email;
            userToSave.name = newUser.name;
            userToSave.phone = newUser.phone;
            userToSave.role = roles_enums_1.Roles['CUSTOMER'];
            return await manager.getRepository(user_entity_1.User).save(userToSave);
        });
    }
    async findOneByEmail(email) {
        return data_source_1.dataSource.getRepository(user_entity_1.User).findOneBy({ email: email });
    }
};
UsersDataService = __decorate([
    (0, common_1.Injectable)()
], UsersDataService);
exports.UsersDataService = UsersDataService;
//# sourceMappingURL=users-data.service.js.map