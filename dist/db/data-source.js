"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.dataSourceOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    dropSchema: false,
    keepConnectionAlive: true,
    logging: process.env.NODE_ENV !== 'production',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../**/migrations/**/*{.ts,.js}'],
};
exports.dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.dataSource.initialize().then((data) => {
    console.log('Database connected');
});
//# sourceMappingURL=data-source.js.map