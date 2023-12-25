import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext.js";
import './UsersCss/PersonalRecipes.css';

const URI = "http://localhost:8000/users/";
const URIComplement = "/recipes";

const CompShowPersonalRecipes = () => {

    const {id} = useParams();
    const [recetas, setRecetas] = useState([]);
    const { authState } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate('/');
            return;
        }
    }, [authState.isAuthenticated, navigate]);

    //Obtener Recetas por el ID de usuario
    useEffect( ()=>{
        const getRecipesByUserId = async () => {
            const res = await axios.get(URI+id+URIComplement);
            setRecetas(res.data);
        }

        getRecipesByUserId();
    },[id])


    return(
        <div className="backgroundPersonalRecipes">
            <div className="formRecipes">
            <h1>Recetas Personales</h1>
            <div className="recipesPersonal">
                {recetas.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                        No tienes recetas personales
                    </div>
                ) : (
                    recetas.map(recipe => (
                        <div className="card mb-3" key={recipe.fb_receta.id} id="cartas">
                            <div className="card-body">
                                <h5 className="card-title">{recipe.fb_receta.nombre_receta}</h5>
                                <p className="card-text">{recipe.fb_receta.descripcion_receta}</p>
                                <Link to={'/recipe/'+recipe.fb_receta.id} className="btn btn-primary">Detalles</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        </div>
    )

}

export default CompShowPersonalRecipes;