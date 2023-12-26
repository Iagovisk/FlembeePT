import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: !!localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        administrador: localStorage.getItem('administrador')
    });

    /**
     * Función para manejar el inicio de sesión del usuario.
     * Establece el token, userId, y estado de administrador en el localStorage y actualiza el estado de authState.
     * 
     * @param {string} token - Token de autenticación del usuario.
     * @param {string} userId - ID del usuario.
     * @param {string} administrador - Estado del usuario como administrador.
     */
    const login = (token, userId, administrador) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('administrador', administrador);
        setAuthState({
            token: token,
            isAuthenticated: true,
            userId: userId,
            administrador: administrador
        });
    };

    /**
     * Función para manejar el cierre de sesión del usuario.
     * Elimina el token, userId y estado de administrador del localStorage y actualiza el estado de authState.
     */
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('administrador');
        setAuthState({
            token: null,
            isAuthenticated: false,
            userId: null,
            administrador: null
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
