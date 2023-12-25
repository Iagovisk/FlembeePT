import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';

//Mostrar todos los usuarios
export const getAllUsers = async(req, res) => {
    try {
        const users = await UserModel.findAll({
            where: {
                activado: 1
            }
        })
        res.json(users);
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//Mostrar un usaurio particular
export const getUser = async(req, res) => {
    try {
        const user = await UserModel.findAll({
            where: {
                id: req.params.id,
                activado: 1
            }
        })
        res.json(user[0]);
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//Crear un usuario
export const createUser = async(req, res) => {
    try {
        await UserModel.create(req.body)
        res.json({
            message: "Se ha creado el usuario", success: true
        });
    } catch (error) {
        if(error.errors[0].message === "email must be unique"){
            res.json({ message: 'El email ya existe', success: false});
        }else if(error.errors[0].message === 'alias must be unique'){
            res.json({ message: 'El alias ya existe', success: false});
        }else{
            res.json({ message: error.message, success: false });
        }
    }
}

//Actualizar un usuario
export const updateUser = async(req, res) => {
    try {
        await UserModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: "Se ha actualizado el usuario", success: true
        });
    } catch (error) {
        if(error.errors[0].message === "email must be unique"){
            res.json({ message: 'El email ya existe', success: false});
        }else if(error.errors[0].message === 'alias must be unique'){
            res.json({ message: 'El alias ya existe', success: false});
        }else{
            res.json({ message: error.message, success: false});
        }
    }
}

//Eliminar un usuario
export const deleteUser = async(req, res) => {
    try {
        await UserModel.update(req.body,{
            where: {
                id: req.params.id
            }
        })
        res.json({
            message: "Se ha eliminado el usuario", success: true
        });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//Login
export const login = async(req, res) => {
    try {
        const user = await UserModel.findAll({
            where: {
                email: req.body.email,
                contraseña: req.body.contraseña
            }
        })
        if(user.length === 0 || user[0].activado === 0){
            res.json({ message: 'Email o contraseña incorrectos.', success: false});
        }else{
            const token = jwt.sign({userId: user[0].id}, '123', {expiresIn: '1h'});
            res.json({ token, userId: user[0].id, administrador: user[0].administrador, success: true});
        }
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}
