"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const data_source_1 = require("../../db/data-source");
const user_entity_1 = require("./user.entity");
exports.UserRepository = data_source_1.dataSource.getRepository(user_entity_1.User).extend({
    async getUserByEmail(email) {
        return await this.findOneBy({ email: email });
    },
});
//# sourceMappingURL=user.repository.js.map