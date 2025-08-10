import { createContext, useEffect, useReducer } from "react";
import axiosInstance from "../Service/Api"; 
import {  useNavigate } from "react-router-dom";


const initialValue = JSON.parse(localStorage.getItem("userAuth")) || {
    username: null,
    token: null,
    userId: null,
    isAuthenticated: false,
    role: null,
  };

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
                userId: action.payload.userId,
                isAuthenticated: action.payload.isAuthenticated,
                role: action.payload.role,
            };
        case "LOGOUT":
            return {
                ...state,
                username: null,
                token: null,
                userId:null,
                isAuthenticated: false,
                role:null
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
            const response = await axiosInstance.post("/api/auth/signIn", credentials);
            if (response.status == 202) {
                const userLoged = {
                        username: response.data.username,
                        token: response.data.jwt,
                        userId: response.data.user_id,
                        isAuthenticated: response.data.isAuthenticate,
                        role: response.data.roles.replace(/[\\[\]" ]/g, '').split(',')[0]
                }
                dispatch({
                    type: "LOGIN",
                    payload: userLoged
                })

                localStorage.setItem("userAuth", JSON.stringify(userLoged))
               
                
                if (userLoged.role == "ROLE_USER") {
                    navigateTo("/user")
                }
                if (userLoged.role == "ROLE_ADMIN" || userLoged.role == "ROLE_ADMIN" ) {
                    navigateTo("/app")
                }
            }else{
                throw new Error("no logued")
            }
            

        } catch (error) {
            throw new Error("no logued" + error)
        }
    }

    const singUp = async (data) => {
        try {
            const response = await axiosInstance.post("/api/auth/signUp", data)
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
  
    
    const logout = () => {
         
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("userAuth")
        localStorage.removeItem("sectionSidebar")
        navigateTo("/login")
       
    };

    const isSomeoneAuthenticate = () => {
        return state.isAuthenticated;
    }

    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem("userAuth");
           
            
            const isValidJwt = async (jwt) => {
                try {
                    const response = await axiosInstance.get("/api/auth/isValidJwt", {
                        headers: {
                          Authorization: `Bearer ${jwt}`,
                        },
                      });
                      
                      
                    if(response.status == 200) { 
                        return true;
                    }else{
                        return false;
                    }
                    
                  
                } catch (error) {
                    console.error("Error validando token:", error);
                    return false;
                }
            };
    
            if (storedUser) {
                const userParsed = JSON.parse(storedUser);
                const isValid = await isValidJwt(userParsed.token);
                
                
                if (isValid) {
                    dispatch({
                        type: "LOGIN",
                        payload: userParsed,
                    });
                } else {
                    localStorage.removeItem("userAuth");
                }
            }
        };
    
        checkAuth(); 
    }, []);
    

    return (
        <AuthContext.Provider value={{ state, singIn, logout, singUp, isSomeoneAuthenticate }}>
            {children}
        </AuthContext.Provider>
    );
};
