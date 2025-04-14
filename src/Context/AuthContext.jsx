import { createContext, useReducer } from "react";
import axiosInstance from "../Service/Api"; // asegúrate que esta instancia esté bien configurada

//  Estado inicial
const initialValue = {
    username: null,
    token: null,
    isAuthenticated: false,
};

// Reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticate,
            };
        case "LOGOUT":
            return {
                ...state,
                username: null,
                token: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

//  contexto
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialValue);

    // Función login
    const login = async (credentials) => {
        try {
            const response = await axiosInstance.post("/api/auth/login", credentials);
            // cambia esto si tu backend responde diferente

            // Guardar en localStorage
            if (response.status == 401) {
                console.log("no mijoooo");

            }

            if (response.status == 202) {
                console.log("bien mijo");
            }
            let token = response.data.jwt;
            let username = response.data.username;
            // Actualizar estado
            dispatch({
                type: "LOGIN",
                payload: { username, token },
            });

            console.log("✅ Login exitoso");
        } catch (error) {
            console.error("❌ Error al iniciar sesión:", error);
            throw error;
        }
    };

    // Función register (puede ser un POST normal)
    const register = async (userData) => {
        try {
            await axiosInstance.post("/api/auth/register", userData);
            // Autologin después de registrarse
            await login({ username: userData.username, password: userData.password });
        } catch (error) {
            console.error("❌ Error al registrar:", error);
            throw error;
        }
    };

    // Función logout
    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
    };

    return (
        <AuthContext.Provider value={{ state, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
