import RecipesModel from "../models/RecipesModel.js";
import CategoriesModel from "../models/CategoriesModel.js";

//Mostrar todas las recetas
export const getAllRecipes = async(req, res) => {
    try {
        const recipes = await RecipesModel.findAll({
            include: {
                model: CategoriesModel,
                required: true,
                attributes: ['nombre_categoria']
            },
            where: {
                activado: 1
            }
        })
        res.json(recipes);
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//Mostrar una receta particular
export const getRecipe = async(req, res) => {
    try {
        const recipe = await RecipesModel.findAll({
            where: {
                id: req.params.id,
                activado: 1
            }
        })
        res.json(recipe[0]);
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//Crear una receta
export const createRecipe = async(req, res) => {
    try {
        await RecipesModel.create(req.body)
        res.json({
            message: "Se ha creado la receta",  success: true
        });
    } catch (error) {
        if(error.name === "SequelizeForeignKeyConstraintError"){
            res.json({ message: 'La categoria no existe', success: false});
        }else{
            res.json({ message: error, success: false });
        }
    }
}

//Actualizar una receta
export const updateRecipe = async(req, res) => {
    try {
        await RecipesModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: "Se ha actualizado la receta", success: true
        });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//Eliminar una receta
export const deleteRecipe = async(req, res) => {
    try {
        await RecipesModel.update(req.body,{
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: "Se ha eliminado la receta", success: true
        });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}
