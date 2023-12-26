import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext.js";
import './RecipesCss/CompShowRecipeDetails.css';

const URI = "http://localhost:8000/recipes/";
const URI2 = "http://localhost:8000/users/recipes";

const CompShowRecipeDetails = () => {
    // Obtiene el ID de la receta de los parámetros de la URL.
    const {id} = useParams();

    // Estados para almacenar los detalles de la receta.
    const [id_receta, setIdReceta] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tiempo_preparacion, setTiempo] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [informacion_nutricional, setInformacion] = useState('');
    const [ingredientes, setIngredientes] = useState('');

    // Contexto de autenticación y hook para la navegación.
    const { authState } = useAuth();
    const navigate = useNavigate();

    // Verifica la autenticación y, si es necesario, redirige al usuario.
    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate('/');
            return;
        } else {
            // Llamada a la API para obtener los detalles de la receta.
            const getRecipeById = async () => {
                const res = await axios.get(URI + id);
                setIdReceta(res.data.id);
                setNombre(res.data.nombre_receta);
                setDescripcion(res.data.descripcion_receta);
                setTiempo(res.data.tiempo_preparacion);
                setInstrucciones(res.data.intrucciones);
                setInformacion(res.data.informacion_nutricional);
                setIngredientes(res.data.ingredientes);
            }
    
            getRecipeById();
        }
    }, [id, authState.isAuthenticated, navigate]);

    // Estados y lógica para manejar la funcionalidad de favoritos.
    const userId = localStorage.getItem('userId');
    const URI3 = "http://localhost:8000/users/" + userId + "/recipes/" + id_receta;
    const [checkRecipe, setCheckRecipe] = useState(false);

    useEffect(() => {
        const checkUserRecipe = async () => {
            const res = await axios.get(URI3);
            if (res.data.success) {
                setCheckRecipe(true);
            }
        }
        checkUserRecipe();
    }, [URI3]);

    // Función para añadir la receta a favoritos.
    const añadirFavoritos = async () => {
        const data = {
            id_usuario: userId,
            id_receta: id_receta
        }
        await axios.post(URI2, data);
        window.location.reload();
    }

    // Función para eliminar la receta de favoritos.
    const eliminarFavorito = async () => {
        await axios.delete(URI3);
        window.location.reload();
    }

    return(
        <div className="backgroundMain">
             <div className="backgroundDetails">
                <div className="row">
                    <h2>{nombre}</h2>
                    {}
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="row-auto">
                            <h3>Descripción</h3>
                            <p>{descripcion}</p>
                        </div>
                        <div className="row-auto">
                            <h3>Tiempo de preparación</h3>
                            <p>El tiempo de preparación estimado para esta receta es de <strong>{tiempo_preparacion} minutos</strong></p>
                        </div>
                    </div>
                    <div className="col-4">
                        <h3>Instrucciones para preparar</h3>
                        <p>{instrucciones}</p>
                    </div>
                    <div className="col-4">
                        <div className="row-auto">
                            <h3>Ingredientes</h3>
                            <p>{ingredientes}</p>
                        </div>
                        <div className="row-auto">
                            <h3>Información nutricional</h3>
                            <p>{informacion_nutricional}</p>
                        </div>
                    </div>
                </div>
                {
                    checkRecipe ? <button className="btn btn-danger" onClick={()=>eliminarFavorito()}>Quitar de favoritos</button> : <button className="btn btn-primary" onClick={()=>añadirFavoritos()}>Guardar</button>
                }
            </div>
        </div>
    )
}

export default CompShowRecipeDetails;