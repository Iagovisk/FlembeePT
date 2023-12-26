import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
import {useAuth} from '../AuthContext/AuthContext.js';
import './RecipesCss/ShowRecipes.css';

const URI = "http://localhost:8000/recipes/";

const CompShowRecipes = () => {

    // Hook para la navegación y contexto de autenticación.
    const [recipes, setRecipes] = useState([]);
    const { authState } = useAuth();
    const navigate = useNavigate();

    // Efectos para redirigir al usuario en caso de no tener autorización.
    useEffect(() => {
        if (authState.administrador === '0') {
            navigate('/');
            return;
        }
    }, [authState.administrador, navigate, authState]);

    // Efectos para redirigir al usuario en caso de no estar autenticado.
    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate('/');
            return;
        }
    }, [authState.isAuthenticated, navigate]);

    //Obtener Recetas al cargar la pagina
    useEffect( ()=>{
        getRecipes()
    },[])

    //Funcion para obtener recetas de la API
    const getRecipes = async () => {
        const res = await axios.get(URI);
        setRecipes(res.data);
    }

    //Eliminar Receta
    const deleteRecipes = async (id) => {
        swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const data = {
                    activado: 0
                }
                await axios.put(URI+id, data);
                swal.fire(
                    'Eliminado!',
                    'La receta ha sido eliminada.',
                    'success'
                )
                getRecipes();
            }
          })
    }

    return (
        <div className="backgroundShowRecipes">
            <h1>Lista de recetas</h1>
            <div className="clearfix">
                <Link to ={'/recipes/create'} className="btn btn-primary btnCrearReceta">Crear Receta</Link>
            </div>
            <div className="divTabla">
                <table className="table">
                    <thead>
                        <tr>
                        <th id="encabezadoTableNombre" scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Ingredientes</th>
                        <th scope="col">Tiempo de preparacion</th>
                        <th scope="col">Instrucciones</th>
                        <th scope="col">Informacion nutricional</th>
                        <th scope="col">Categoria</th>
                        <th id="encabezadoTableAcciones" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="tbodyTabla">
                        {recipes.map(recipe => (
                            <tr key={recipe.id}>
                                <td id="tdNombre">{recipe.nombre_receta}</td>
                                <td>{recipe.descripcion_receta}</td>
                                <td>{recipe.ingredientes}</td>
                                <td>{recipe.tiempo_preparacion}</td>
                                <td>{recipe.intrucciones}</td>
                                <td>{recipe.informacion_nutricional}</td>
                                <td>{recipe.fb_categoria.nombre_categoria}</td>
                                <td id="tdAcciones">
                                    <Link to ={'/recipes/edit/'+recipe.id} className="btn btn-warning btnEditar">Editar</Link>
                                    <button onClick={()=>deleteRecipes(recipe.id)} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default CompShowRecipes;