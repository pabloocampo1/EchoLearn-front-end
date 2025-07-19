
import { DarkModeOutlined, LoginOutlined, WbSunny } from '@mui/icons-material';

import { Box, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoWeb from './logoWeb';
import SimpleBackdrop from './SimpleBackDrop';


const Header = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext)
    const navigate = useNavigate();
    const [isLogout, setIsLogout] = useState(false);

    const { state, logout } = useContext(AuthContext);

    const navigateTo = () => {
       

        if (state.role === "ROLE_ADMIN" || state.role === "ROLE_SUPERADMIN") {
            navigate("/app")
        }
        

        if (state.role === "ROLE_USER") {
            navigate("user/profile")
        }

        

    }

    const handleLogout = () => {
        setIsLogout(() => {
            setIsLogout(true)
            logout()
        }, 1000)

        setIsLogout(false);
    }

    return (
        <Box component="header"
            sx={{
                width: "100%",
                height: "10vh",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: "0px 150px",
                bgcolor: "background.paper",
                borderBottom: "1px solid #3BB09D ",
            }}>
            {isLogout && <SimpleBackdrop />}
            <LogoWeb />
            <Box>
                <Box component="nav"
                >
                    <Box component="ol" sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        listStyle: "none"
                    }}>
                        <Typography
                            onClick={() => navigate("/")}
                            component="li"
                            sx={{
                                pr: "15px",
                                cursor: "pointer",
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >Inicio</Typography>
                        <Typography
                            onClick={() => navigate("ExamsHome")}
                            component="li"
                            sx={{
                                pr: "15px",
                                cursor: "pointer",
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}>Examenes</Typography>
                        <Typography
                            onClick={() => navigate("Exercice")}
                            component="li"
                            sx={{
                                pr: "15px",
                                cursor: "pointer",
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}>Ejercicios</Typography>
                        <Typography
                            onClick={() => navigate("Blog")}
                            component="li"
                            sx={{
                                pr: "15px",
                                cursor: "pointer",
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}>Blog</Typography>

                    </Box>
                </Box>
            </Box>

            <Box sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
            }}>
                <Box
                    sx={{ mr: "10px", display: "flex", alignItems:"center"  }}
                    onClick={() => toggleDarkMode()}>
                    {darkMode ? <WbSunny sx={{ color: "primary.main" }} /> : <DarkModeOutlined sx={{ color: "primary.main" }} />}
                </Box>
                <Box
                    sx={{ mr: "10px",display: "flex", alignItems:"center" }}
                    onClick={() => navigateTo()} >
                    {state.isAuthenticated && (
                        <AccountCircleIcon sx={{ color: "primary.main" }} />
                    )}
                </Box>
                <Box
                    sx={{ mr: "10px", cursor:"pointer" }}
                >
                    {state.isAuthenticated
                        ? (
                            <Box onClick={() => handleLogout()} sx={{ mr: "10px", display: "flex" }}>
                            <LogoutIcon  sx={{ color: "primary.main" }} /> <Typography sx={{pl:"5px"}}>Logout</Typography>
                         </Box>
                        )
                        : (
                            <Box onClick={() => navigate("/login")} sx={{ mr: "10px", display: "flex" }}>
                                <LoginOutlined  sx={{ color: "primary.main" }} /> <Typography sx={{pl:"5px"}}>Login</Typography>
                            </Box>
                        )}
                </Box>
            </Box>
        </Box>
    );
};

export default Header;