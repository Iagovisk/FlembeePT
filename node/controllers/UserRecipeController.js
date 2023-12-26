import UserRecipesModel from "../models/UserRecipesModel.js";
import RecipesModel from "../models/RecipesModel.js";

//Mostrar todas las recetas de un usuario
export const getAllUserRecipes = async(req, res) => {
    try {
        const userRecipes = await UserRecipesModel.findAll({
            where: {
                id_usuario: req.params.id
            },
            include: {
                model: RecipesModel,
                required: true,
                attributes: ['nombre_receta', 'descripcion_receta', 'id'],
                where : {
                    activado: 1
                }   
            }
        })
        res.json(userRecipes);
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//Añadir una receta favorita a un usuario
export const addUserRecipe = async(req, res) => {
    try {
        await UserRecipesModel.create(req.body)
        res.json({
            message: "Se ha añadido la receta a favoritos", success: true
        });
    } catch (error) {
        if(error.name === "SequelizeForeignKeyConstraintError"){
            res.json({ message: 'El usuario o la receta no existen', success: false});
        }else{
            res.json({ message: error, success: false });
        }
    }
}

//Eliminar una receta favorita de un usuario
export const deleteUserRecipe = async(req, res) => {
    try {
        await UserRecipesModel.destroy({
            where: {
                id_usuario: req.params.id_usuario,
                id_receta: req.params.id_receta
            }
        })
        res.json({
            message: "Se ha eliminado la receta de favoritos", success: true
        });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//Verificar si una receta es favorita de un usuario
export const checkUserRecipe = async(req, res) => {
    try {
        const userRecipe = await UserRecipesModel.findOne({
            where: {
                id_usuario: req.params.id_usuario,
                id_receta: req.params.id_receta
            }
        })
        if(userRecipe){
            res.json({ message: "La receta es favorita del usuario", success: true });
        }else{
            res.json({ message: "La receta no es favorita del usuario", success: false });
        }
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}