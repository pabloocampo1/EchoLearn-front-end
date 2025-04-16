import { createContext, useEffect, useReducer } from "react";
import axiosInstance from "../Service/Api"; 
import { useNavigate } from "react-router-dom";


const initialValue = {
    username: null,
    token: null,
    isAuthenticated: false,
};

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

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialValue);
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path)
    }

    const singIn = async (credentials) => {
        try {
            const response = await axiosInstance.post("/api/auth/singIn", credentials);
            
            if (response.status == 202) {
                console.log("logueadi");
                dispatch({
                    type: "LOGIN",
                    payload: {
                        username: response.data.username,
                        token: response.data.jwt,
                        isAuthenticate: response.data.isAuthenticate,
                    }
                })
                
                navigateTo("/app")
            }else{
                console.log("nologuead");
                
            }
            

        } catch (error) {
            console.error(error);
            
        }
    }

    const singUp = async (data) => {
        try {
            const response = await axiosInstance.post("/api/auth/singUp", data)
            if (response.status == 201) {
                navigateTo("/login")
                return {
                    "estate": true
                }
            }
        } catch (error) {
            console.error(error)
            return {
                "estate": false
            }
        }
    }
  
    
    // Función logout
    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
    };

    const isSomeoneAuthenticate = () => {
        return state.isAuthenticated;
    }

    useEffect(() => {
        console.log(state);
        
    }, [state])

    return (
        <AuthContext.Provider value={{ state, singIn, logout, singUp, isSomeoneAuthenticate }}>
            {children}
        </AuthContext.Provider>
    );
};
