
import { DarkModeOutlined, LoginOutlined, WbSunny } from '@mui/icons-material';

import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';


const Header = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext)
    const navigate = useNavigate();

    const {state, logout} = useContext(AuthContext);

    const navigateTo = (path) => {
        navigate(path)
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
            }}>
            <Box>
                <img width={50} src="https://skiandsnowboardgym.com/wp-content/uploads/2019/08/qa_icon.png" alt="img logo" />
            </Box>
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
                            onClick={() => navigateTo("/")}
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
                            onClick={() => navigateTo("Exams")}
                            component="li"
                            sx={{
                                pr: "15px",
                                cursor: "pointer",
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}>Examenes</Typography>
                        <Typography
                            onClick={() => navigateTo("/Exercice")}
                            component="li"
                            sx={{
                                pr: "15px",
                                cursor: "pointer",
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}>Ejercicios</Typography>
                        <Typography
                            onClick={() => navigateTo("/Blog")}
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
                    sx={{ mr: "10px" }}
                    onClick={() => toggleDarkMode()}>
                    {darkMode ? <WbSunny sx={{ color: "primary.main" }}  /> : <DarkModeOutlined sx={{ color: "primary.main" }} />}
                </Box>
                <Box
                    sx={{ mr: "10px" }}
                    onClick={() => navigateTo("profile")} >
                    {state.isAuthenticated && <AccountCircleIcon sx={{ color: "primary.main" }} />}
                </Box>
                <Box
                    sx={{ mr: "10px" }}
                     >
                    {state.isAuthenticated ? <LogoutIcon onClick={() => logout()} sx={{ color: "primary.main" }} />  : <LoginOutlined onClick={() => navigateTo("/login")} sx={{ color: "primary.main" }} />}
                </Box>
            </Box>
        </Box>
    );
};

export default Header;