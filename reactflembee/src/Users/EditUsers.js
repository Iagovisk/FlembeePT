import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert2';
import { useAuth } from "../AuthContext/AuthContext.js";
import './UsersCss/EditUser.css';

const URI = "http://localhost:8000/users/";

const CompEditUsers = () => {

    const {id} = useParams();
    const [alias, setAlias] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [administrador, setAdministrador] = useState('');
    const navigate = useNavigate();
    const { authState } = useAuth();

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate('/');
            return;
        }
    }
    , [authState.isAuthenticated, navigate]);

    //Procedimiento para actualizar usuario

    const update = async (e) => {
        e.preventDefault();
        const user = {
            alias: alias,
            email: email,
            contraseña: password,
            administrador: administrador
        }
        const res = await axios.put(URI+id, user);
        if(!res.data.success){
            return swal.fire({
                title: 'Error!',
                text: res.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        swal.fire({
            title: 'Exito!',
            text: res.data.message,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/users');
            }
        })
    }

    useEffect( ()=>{
        const getUserById = async () => {
            const res = await axios.get(URI+id);
            setAlias(res.data.alias);
            setEmail(res.data.email);
            setPassword(res.data.contraseña);
            setAdministrador(res.data.administrador.toString());
        }
        getUserById();
    },[id])


    return (
        <div className="backgroundEditUsers">
            <div className="compEditUsers">
                <h3>Editar Usuario</h3>
                <form onSubmit={update}>
                    <div className="mb-3">
                        <label>Alias</label>
                        <input type="text" className="form-control" onChange={(e)=>setAlias(e.target.value)} value={alias}/>
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="text" className="form-control" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    </div>
                    <div className="mb-3">
                        <label>Contraseña</label>
                        <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    </div>
                    <div className="mb-3">
                        <label>Administrador</label>
                        <select className="form-control" onChange={(e)=>{setAdministrador(e.target.value)}} value={administrador.toString()}>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                </form>
            </div>
        </div>
    )

}

export default CompEditUsers;

