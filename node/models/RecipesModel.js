import db from "../database/db.js";
import { DataTypes } from "sequelize";
import CategoriesModel from "./CategoriesModel.js";

const RecipesModel = db.define("fb_recetas", {
    nombre_receta: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    descripcion_receta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ingredientes: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tiempo_preparacion: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    intrucciones: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    informacion_nutricional: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activado: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    }
})

RecipesModel.belongsTo(CategoriesModel, { foreignKey: 'id_categoria' });

export default RecipesModel;