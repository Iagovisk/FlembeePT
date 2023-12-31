import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext.js";
import './Dashboard.css'

const URI = "http://localhost:8000/recipes/";

const CompShowDashboard = () => {

    // Estado para almacenar las recetas y el término de búsqueda.
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Hook para autenticación y navegación.
    const { authState } = useAuth();
    const navigate = useNavigate();

    // useEffect para redirigir si el usuario no está autenticado y obtener recetas.
    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate('/');
            return;
        } else {
            getRecipes()
        }
    }, [authState.isAuthenticated, navigate])

    // Función para obtener recetas de la API.
    const getRecipes = async () => {
        const res = await axios.get(URI);
        setRecipes(res.data);
    }

    return(
        <div className="backgroundDashboard">
            <div className="formRecipes">
                {/* Input para buscar recetas */}
                <div className="form-floating buscadorInput">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="  "
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingInput">Buscar Receta...</label>
                </div>

                {/* Mostrar recetas filtradas según el término de búsqueda */}
                <div className="recipesDashboard">
                    {recipes.filter(recipe => 
                        recipe.nombre_receta.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        recipe.descripcion_receta.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        recipe.informacion_nutricional.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        recipe.fb_categoria.nombre_categoria.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map(recipe => (
                        <div className="card mb-3" key={recipe.id} id="cartas">
                            <div className="card-body">
                                <h5 className="card-title">{recipe.nombre_receta}</h5>
                                <p className="card-text">{recipe.descripcion_receta}</p>
                                <Link to={'/recipe/'+recipe.id} className="btn btn-primary">Detalles</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CompShowDashboard;
