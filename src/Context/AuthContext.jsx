import { createContext, useEffect, useReducer } from "react";
import axiosInstance from "../Service/Api"; 
import { Await, useNavigate } from "react-router-dom";


const initialValue = JSON.parse(localStorage.getItem("userAuth")) || {
    username: null,
    token: null,
    isAuthenticate: false,
    role: null,
  };

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticate,
                role: action.payload.role,
            };
        case "LOGOUT":
            return {
                ...state,
                username: null,
                token: null,
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
            const response = await axiosInstance.post("/api/auth/singIn", credentials);
            
            if (response.status == 202) {
                const userLoged = {
                        username: response.data.username,
                        token: response.data.jwt,
                        isAuthenticate: response.data.isAuthenticate,
                        role: response.data.roles.replace(/[\\[\]" ]/g, '').split(',')[0]
                }
                dispatch({
                    type: "LOGIN",
                    payload: userLoged
                })

                localStorage.setItem("userAuth", JSON.stringify(userLoged))
                
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
  
    
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("userAuth")
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
                    if(response.status == 203) { 
                        logout()
                    }
                    
                    return response.data;
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
