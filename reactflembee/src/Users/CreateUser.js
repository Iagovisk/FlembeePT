import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
import { useAuth } from "../AuthContext/AuthContext.js";
import './UsersCss/CreateUser.css';

const URI = "http://localhost:8000/users/";

const CompCreateUser = () => {
   
    const [alias, setAlias] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [administrador, setAdministrador] = useState('');
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

    //Efectos para redirigir al usuario en caso de no estar autenticado.
    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate('/');
            return;
        }
    }, [authState.isAuthenticated, navigate]);

    //Guardar Usuario

    const user = {
        alias: alias,
        email: email,
        contraseña: password,
        administrador: administrador
    }

    const store = async (e) => {
        e.preventDefault();
        const result = await axios.post(URI, user);
        if(!result.data.success){
            return swal.fire({
                title: 'Error!',
                text: result.data.message,
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
                    navigate('/users');
                }
            })
        }
    }


    return(
        <div className="backgroundCreateUser">
            <div className="compCreateUsers">
                <h3>Registrar Usuario</h3>
                <form onSubmit={store}>
                    <div className="mb-3">
                        <label>Alias</label>
                        <input type="text" className="form-control" onChange={(e)=>setAlias(e.target.value)} value={alias} required/>
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} value={password} required/>                    
                    </div>
                    <div className="mb-3">
                        <label>Administrador</label>
                        <select className="form-control" onChange={(e)=>{setAdministrador(e.target.value)}} value={administrador} required>
                            <option disabled value="">Seleccionar opción...</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form> 
            </div>
        </div>
    
    )
}

export default CompCreateUser;