import { Sequelize } from "sequelize";

const db = new Sequelize('database_flembee', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;