
import { Children, createContext, useReducer } from "react";

import axiosInstance from "../Service/Api";


const initialValue = {
    username: null,
    token:null,
    isAuthenticate: false,
}

const authReduce = (state, action ) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
                isAuthenticate: true,

            };
        case "LOGAOUT":
            return {
                ...state,
                username: null,
                token: null,
                isAuthenticate: false,

            };
        default:
           return {
            state
           };
    }
}

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer( authReduce, initialValue);

    const login = async (credential) => {
        try {
            const {response} = await axiosInstance.post("/api/auth/login", credential);
            if(response.status == 200){
                console.log("se auntentico correctamente.");
                localStorage.setItem("token", response.token)
            }else{
                console.log("perra");   
            }
        } catch (error) {
            console.error("perra");
            console.log(error);
            
        }
        
        dispatch({
            type:"LOGIN",
            payload: {username: credential.username, token:credential.email}
        })
        console.log("ingreso sesion con:" + credential);
        console.log(state);
        
    }

    const register = (userData) => {
        

        const credentialForLogin = {username: userData.username, password: userData.password}
        login(credentialForLogin)
    }

    return (
        <AuthContext.Provider value={{ state, login, register }}>
          {children}
        </AuthContext.Provider>
      );
}