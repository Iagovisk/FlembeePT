import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';

const CompNavbar = () => {
    // Hook para acceder a las funciones del contexto de autenticación, en este caso, logout.
    const { logout } = useAuth();

    // Obtención del ID del usuario y su rol (administrador) desde localStorage.
    const user = JSON.parse(localStorage.getItem('userId'));
    const administrador = JSON.parse(localStorage.getItem('administrador'));

    // Construcción del URI para la solicitud API.
    const URI = "http://localhost:8000/users/"+user;

    // Estado para almacenar los datos del usuario.
    const [users, setUsers] = useState("");

    // useEffect para realizar una llamada a la API y obtener los datos del usuario.
    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(URI);
            setUsers(res.data);
        }
        getUser();
    }, [URI]);

    return (
        <nav className="navbar navbar-expand-lg" id='navbarMain'>
            <div className="container-fluid">
                {/* Renderizado condicional basado en si el usuario está logueado o no. */}
                {user === null ? (
                    <>
                        <Link to ={'/'} className="navbar-brand">RecipeApp</Link>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            {/* Contenido adicional para usuarios no logueados */}
                        </div>
                    </>
                ) : (
                    <>
                        <Link to={'/dashboard'} className="navbar-brand">
                            RecipeApp
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            {/* Mostrar opciones adicionales si el usuario es administrador. */}
                            {administrador === 1 ? (
                                <>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link to={'/users'} className="nav-link">
                                                Usuarios
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={'/recipes'} className="nav-link">
                                                Recetas
                                            </Link>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                // Contenido para usuarios no administradores.
                                <ul></ul>
                            )}

                            {/* Menú desplegable para el usuario. */}
                            <div className="nav-item dropdown">
                                <button className='nav-link dropdown-toggle' type='button' data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-user" style={{marginRight: '6px'}}></i>
                                    <strong>{users.alias}</strong>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link to={'/users/' + user} className="dropdown-item">Recetas personales</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><button className='dropdown-item' onClick={logout}>Cerrar Sesión</button></li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}

export default CompNavbar;
