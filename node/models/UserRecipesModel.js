import db from "../database/db.js";
import { DataTypes } from "sequelize";
import RecipesModel from "./RecipesModel.js";
import UserModel from "./UserModel.js";

const UserRecipesModel = db.define("fb_recetas_usuarios", {
    id_usuario: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_receta: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
})

UserRecipesModel.belongsTo(UserModel, { foreignKey: 'id_usuario' });
UserRecipesModel.belongsTo(RecipesModel, { foreignKey: 'id_receta' });

export default UserRecipesModel;