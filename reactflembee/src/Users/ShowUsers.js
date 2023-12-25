import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
import { useAuth } from "../AuthContext/AuthContext.js";
import './UsersCss/ShowUsers.css';


const URI = "http://localhost:8000/users/";

const CompShowUsers = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { authState } = useAuth();

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate('/');
            return;
        }
    }
    , [authState.isAuthenticated, navigate]);

    useEffect( ()=>{
        getUsers()
    },[])

    //Obtener Usuarios
    const getUsers = async () => {
        const res = await axios.get(URI);
        setUsers(res.data);
    }

    //Eliminar Usuario
    const deleteUsers = async (id) => {
        swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const data = {
                    activado: 0
                }
                await axios.put(URI+id, data);
                swal.fire(
                    'Eliminado!',
                    'El usuario ha sido eliminado.',
                    'success'
                )
                getUsers();
            }
          })
    }

    return (
        <div className="backgroundShowUsers">
            <h1>Lista de usuarios</h1>
                <div className="clearfix">
                    <Link to={'/users/create'} className="btn btn-primary btnCrearUser">Crear Usuario</Link>
                 </div>

            <div className="divTabla">
                <table className="table">
                    <thead>
                        <tr>
                        <th id="encabezadoTableAlias" scope="col">Alias</th>
                        <th id="encabezadoTableCorreo" scope="col">Correo</th>
                        <th id="encabezadoTableAcciones" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="tbodyTabla">
                        {users.map(user => (
                            <tr key={user.id}>
                                <td id="tdAlias">{user.alias}</td>
                                <td>{user.email}</td>
                                <td id="tdAcciones">
                                    <Link to ={'/users/edit/'+user.id} className="btn btn-secondary btnEditarUser">Editar</Link>
                                    <button className='btn btn-danger' onClick={()=>deleteUsers(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CompShowUsers;