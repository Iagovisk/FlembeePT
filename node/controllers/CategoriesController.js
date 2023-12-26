import CategoriesModel from "../models/CategoriesModel.js";

//Mostrar todas las categorias
export const getAllCategories = async(req, res) => {
    try {
        const categories = await CategoriesModel.findAll()
        res.json(categories);
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//Mostrar una categoria particular
export const getCategory = async(req, res) => {
    try {
        const category = await CategoriesModel.findAll({
            where: {
                id: req.params.id
            }
        })
        res.json(category[0]);
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//Crear una categoria
export const createCategory = async(req, res) => {
    try {
        const newCategory = await CategoriesModel.create(req.body)
        res.json({
            message: "Se ha creado la categoria", success: true, id: newCategory.id
        });
    } catch (error) {
        if(error.errors[0].message === "nombre_categoria must be unique"){
            res.json({ message: 'La categoria ya existe', success: false});
        }else{
            res.json({ message: error.message, success: false });
        }
    }
}

//Actualizar una categoria
export const updateCategory = async(req, res) => {
    try {
        await CategoriesModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: "Se ha actualizado la categoria", success: true
        });
    } catch (error) {
        if(error.errors[0].message === "nombre_categoria must be unique"){
            res.json({ message: 'La categoria ya existe', success: false});
        }else{
            res.json({ message: error.message, success: false });
        }
    }
}

//Eliminar una categoria
export const deleteCategory = async(req, res) => {
    try {
        await CategoriesModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: "Se ha eliminado la categoria", success: true
        });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}