import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UserModel = db.define("fb_usuarios", {
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    alias: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    activado: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    },
    administrador: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    }
})

export default UserModel;