import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
import './SignupCss/Signup.css';

const URI = "http://localhost:8000/users/";

const CompShowSignup = () => {
    // Estados para almacenar los valores de los campos del formulario.
    const [alias, setAlias] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Hook para la navegación.
    const navigate = useNavigate();

    // Objeto usuario con los datos ingresados en el formulario.
    const user = {
        alias: alias,
        email: email,
        contraseña: password
    }

    // Función para manejar el envío del formulario.
    const store = async (e) => {
        e.preventDefault();
        try {
            // Llamada a la API para registrar el usuario.
            const result = await axios.post(URI, user);
            if(!result.data.success){
                // Mostrar mensaje de error si la creación del usuario falla.
                swal.fire({
                    title: 'Error!',
                    text: result.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            } else {
                // Mostrar mensaje de éxito y redirigir al usuario.
                swal.fire({
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
        } catch (error) {
            // Manejar cualquier otro error.
            alert(error);
        }
    }

    return(
        <div className="background">
            <div className="formSignUp">
            <h3>Registrar Usuario</h3>
            <form onSubmit={store} className="inputsLogin">
                <div className="col-8">
                    <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="  "
                            onChange={(e) => setAlias(e.target.value)}
                            required
                        />
                        <label htmlFor="floatingInput">Alias</label>
                    </div>
                </div>
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
                <button type="submit" id="loginBtn" className="btn btn-primary">Registrarse</button>
            </form> 
        </div>
        </div>

    )
}

export default CompShowSignup;
