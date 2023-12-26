import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, login, updateUser } from "../controllers/UserController.js";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/CategoriesController.js";
import { createRecipe, deleteRecipe, getAllRecipes, getRecipe, updateRecipe } from "../controllers/RecipesController.js";
import { addUserRecipe, checkUserRecipe, deleteUserRecipe, getAllUserRecipes } from "../controllers/UserRecipeController.js";

const router = express.Router();

//Rutas de usuarios
router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.put('/users/:id', deleteUser);
router.post('/login', login);

//Rutas de categorias
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategory);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

//Rutas de recetas
router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipe);
router.post('/recipes', createRecipe);
router.put('/recipes/:id', updateRecipe);
router.put('/recipes/:id', deleteRecipe);

//Rutas de recetas favoritas de un usuario
router.get('/users/:id/recipes', getAllUserRecipes);
router.post('/users/recipes', addUserRecipe);
router.delete('/users/:id_usuario/recipes/:id_receta', deleteUserRecipe);
router.get('/users/:id_usuario/recipes/:id_receta', checkUserRecipe);


export default router;