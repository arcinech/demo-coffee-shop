"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRepository = void 0;
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("./tag.entity");
const data_source_1 = require("../../db/data-source");
exports.TagRepository = data_source_1.dataSource.getRepository(tag_entity_1.Tag).extend({
    findTagsByName(names) {
        return this.find({
            where: {
                name: (0, typeorm_1.In)(names),
            },
        });
    },
});
//# sourceMappingURL=tag.repository.js.map