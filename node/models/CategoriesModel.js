import db from "../database/db.js";
import { DataTypes } from "sequelize";

const CategoriesModel = db.define("fb_categorias", {
    nombre_categoria: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    descripcion_categoria: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

export default CategoriesModel;