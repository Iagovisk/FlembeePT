import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';

const CompNavbar = () => {
    const { logout } = useAuth();

    const user = JSON.parse(localStorage.getItem('userId'));
    const administrador = JSON.parse(localStorage.getItem('administrador'));
    const URI = "http://localhost:8000/users/"+user;
    const [users, setUsers] = useState("");

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
                {user === null ? (
                    <>
                    <Link to ={'/'} className="navbar-brand">RecipeApp</Link>
                        <div className="collapse navbar-collapse" id="navbarNav">
                        </div>
                    </>
                ) : (
                    <>
                        <Link to={'/dashboard'} className="navbar-brand">
                            RecipeApp
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarNav">
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
                                <><ul>
                                    
                                </ul></>
                            )}

                            <div className="nav-item dropdown">
                                <button className='nav-link dropdown-toggle' type='button' data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-user" style={{marginRight: '6px'}}></i><strong>{users.alias}</strong></button>
                                <ul className="dropdown-menu">
                                    <li><Link to={'/users/' + user} className="dropdown-item">Recetas favoritas</Link></li>
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