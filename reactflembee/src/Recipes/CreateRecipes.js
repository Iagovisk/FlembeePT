import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
import { useAuth } from "../AuthContext/AuthContext.js";
import './RecipesCss/CreateRecipe.css';

const URI = "http://localhost:8000/recipes/";
const URI2 = "http://localhost:8000/categories/";

const CompCreateRecipes = () => {
    // Estados para almacenar los valores de los campos del formulario.
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [informacion, setInformacion] = useState('');
    const [categorias, setCategoria] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [mostrarSelect, setMostrarSelect] = useState(true);
    const [categoriaInput, setCategoriaInput] = useState('');
    const [descripcionCategoria, setDescripcionCategoria] = useState('');
    const [ingredientes, setIngredientes] = useState('');

    // Hook para la navegación y contexto de autenticación.
    const navigate = useNavigate();
    const { authState } = useAuth();

    // Efectos para redirigir al usuario en caso de no tener autorización.
    useEffect(() => {
        if (authState.administrador === '0') {
            navigate('/');
            return;
        }
    }, [authState.administrador, navigate, authState]);

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate('/');
            return;
        }
    }, [authState.isAuthenticated, navigate]);

    // Función para obtener categorías de la API.
    const getCategories = async () => {
        const res = await axios.get(URI2);
        setCategoria(res.data);
    }

    // Efecto para cargar categorías al montar el componente.
    useEffect(() => {
        getCategories();
    }, []);

    // Función para manejar el envío del formulario.
    const store = async (e) => {
        e.preventDefault();

        // Creación del objeto receta.
        const recipe = {
            nombre_receta: nombre,
            descripcion_receta: descripcion,
            ingredientes: ingredientes,
            tiempo_preparacion: tiempo,
            intrucciones: instrucciones,
            informacion_nutricional: informacion,
            id_categoria: selectedCategoria 
        };

        // Lógica para guardar la receta o crear una nueva categoría.
        if(!mostrarSelect){
                const categoria = {
                    nombre_categoria: categoriaInput,
                    descripcion_categoria: descripcionCategoria
                }
                const res = await axios.post(URI2, categoria);
                if(res.data.success){
                    recipe.id_categoria = res.data.id;
                    const result = await axios.post(URI, recipe);
                    if(!result.data.success){
                        return swal.fire({
                            title: 'Error!',
                            text: 'No se pudo guardar la receta',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    }else{
                        return swal.fire({
                            title: 'Exito!',
                            text: result.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/recipes');
                            }
                        })
                    }
                }else{
                    return swal.fire({
                        title: 'Error!',
                        text: res.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }else{
                const result = await axios.post(URI, recipe);
                if(!result.data.success){
                    return swal.fire({
                        title: 'Error!',
                        text: 'No se pudo guardar la receta',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else{
                    return swal.fire({
                        title: 'Exito!',
                        text: result.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/recipes');
                        }
                    })
                }
            }
    };

    // Función para activar la creación de una nueva categoría.
    const añadirCategoria = async () => {
        setMostrarSelect(false);
    };

    return(
        <div className="backgroundCreateRecipe">
            <div className="compCreateRecipes">
                <h3>Registrar Receta</h3>
                <form onSubmit={store}>
                    <div className="mb-3">
                        <label>Nombre</label>
                        <input type="text" placeholder="Nombre..." className="form-control" onChange={(e)=>setNombre(e.target.value)} value={nombre} required/>
                    </div>
                    <div className="mb-3">
                        <label>Descripcion</label>
                        <input type="text" placeholder="Descripción..." className="form-control" onChange={(e)=>setDescripcion(e.target.value)} value={descripcion} required/>
                    </div>
                    <div className="mb-3">
                        <label>Ingredientes</label>
                        <input type="text" placeholder="Ingredientes..." className="form-control" onChange={(e)=>setIngredientes(e.target.value)} value={ingredientes} required/>
                    </div>
                    <div className="mb-3">
                        <label>Tiempo de preparacion (en minutos)</label>
                        <input type="number" placeholder="Tiempo de preparación..." className="form-control" onChange={(e)=>setTiempo(e.target.value)} value={tiempo} required/>
                    </div>
                    <div className="mb-3">
                        <label>Instrucciones</label>
                        <input type="text" placeholder="Instrucciones..." className="form-control" onChange={(e)=>setInstrucciones(e.target.value)} value={instrucciones} required/>
                    </div>
                    <div className="mb-3">
                        <label>Informacion nutricional</label>
                        <input type="text" placeholder="Información nutricional..." className="form-control" onChange={(e)=>setInformacion(e.target.value)} value={informacion} required/>
                    </div>
                    <div className="mb-3">
                    <label>Categoria</label>
                    {mostrarSelect ? (
                        <select className="form-control" onChange={(e)=>setSelectedCategoria(e.target.value)} value={selectedCategoria}>
                            <option disabled value="">Seleccionar una categoria...</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>{categoria.nombre_categoria}</option>
                            ))}
                        </select>
                        ) : (
                            <div>
                                <div className="mb-3">
                                    <input type="text" placeholder="Nueva categoría..." className="form-control" onChange={(e)=>setCategoriaInput(e.target.value)} value={categoriaInput} required/>
                                </div>
                                <div className="mb-3">
                                    <label>Descripcion de categoria</label>
                                    <input type="text" placeholder="Descripción de categoria" className="form-control" onChange={(e)=>setDescripcionCategoria(e.target.value)} value={descripcionCategoria} required/>
                                </div>
                            </div>
                            
                        )}
                        <button type="button" className="btn btn-success" onClick={()=>añadirCategoria()}>Añadir Categoria</button>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>        
        </div>
    
    )
}

export default CompCreateRecipes;