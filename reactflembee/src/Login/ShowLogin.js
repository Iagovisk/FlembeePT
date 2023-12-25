import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext.js";
import swal from 'sweetalert2';
import './LoginCss/Login.css';

const URI = "http://localhost:8000/login";

const CompShowLogin = () => {
    
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const { login } = useAuth();
        const navigate = useNavigate();
        const { authState } = useAuth();

        useEffect(() => {
            if (authState.isAuthenticated) {
                navigate('/dashboard');
                return;
            }
        }
        , [authState.isAuthenticated, navigate]);
    
        const login2 = async (event) => {
            event.preventDefault();
            try {
                const {data} = await axios.post(URI, {email: email, contraseña: password});
                if(data.success){
                    login(data.token, data.userId, data.administrador);
                    navigate('/dashboard');
                }else{
                    swal.fire({
                        title: data.message,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } catch (error) {
                alert(error);
            }

        }
    
        return(
            <div className="background">
                <div className="formLogin">
                    <h1>Iniciar Sesión</h1>
                    <div className="row inputsLogin">
                        <div className="col-8">
                            <div className="form-floating mb-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="floatingInput" 
                                    placeholder="  "
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="form-floating">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="floatingPassword" 
                                    placeholder="  "
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="floatingPassword">Contraseña</label>
                            </div>
                        </div>
                        <button className="btn btn-primary" id="loginBtn" onClick={login2}>Iniciar Sesión</button>
                    </div>
                    <p>¿No tienes una cuenta? <Link to={'/signup'}>Registrate.</Link></p>
                </div>
            </div>
        )

}

export default CompShowLogin;