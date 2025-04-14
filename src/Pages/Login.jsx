import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import ButtonComponent from '../Components/ButtonComponet';
import { ThemeContext } from '../Context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import OptionToLogin from '../Components/OptionToLogin';
import InputUserName from '../Components/InputUserName';
import InputPassWord from '../Components/InputPassword';
import { AuthContext } from '../Context/AuthContext';



const Login = () => {
    const {login, state} = useContext(AuthContext);
    const [userDataCredential, setUserDataCredential] = useState({
        username: "",
        password: "",
    })
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setUserDataCredential({
            ...userDataCredential,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userDataCredential.username);
        await login(userDataCredential)
        console.log(state);
        
        setUserDataCredential({
            username: "",
            password: "",
        })
        
    }

    const navigateTo = (path) => {
        navigate(path)
    }


    return (
        <Box sx={{ bgcolor: "background.default", height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", }}>
            {/* section mensage*/}
            <Box sx={{
                bgcolor: "background.paper",
                width: "60%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "20px 100px"
            }}>
                <Typography variant='h2' sx={{ color: "primary.main", fontWeight: "500", textAlign: "center", mt: "8vh" }}>SIGN UP</Typography>
                <OptionToLogin />


                <Typography variant='p' sx={{ opacity: "0.80", pt: "50px", pb: "10px" }}>Or use your credentials</Typography>
                <Link to={"/register"} style={{ marginBottom: "40px", color: "black", opacity: "0.60" }} >You don't have a acount? create one here!</Link>

                <form onSubmit={handleSubmit}>

                    <Box sx={{ mb: "20px", mt: "10px" }}>
                        <InputUserName value={userDataCredential.username} onChange={handleInputChange} />
                    </Box>
                    <Box sx={{ mb: "20px", mt: "10px" }}>
                        <InputPassWord value={userDataCredential.password} onChange={handleInputChange} />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Link style={{ marginBottom: "40px", color: "black", opacity: "0.60", textAlign: "center" }}>Forgot Your Password?</Link>
                    </Box>
                    <Box sx={{ mt: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ButtonComponent text="SIGN IN" type="submit"  />
                    </Box>
                </form>

            </Box>

            {/* section loggin*/}
            <Box
                sx={{
                    bgcolor: "primary.main",
                    width: "40%",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center",
                    p:"0px 120px"
                }}>
                {/* Figuras geométricas  de fondo */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "95%",
                        width: "100px",
                        height: "100px",
                        bgcolor: "rgba(255, 255, 255, 0.10)",

                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "0%",
                        left: "0%",
                        width: "200px",
                        height: "200px",
                        borderRadius: "0px 100% 0px 0px",
                        bgcolor: "rgba(255, 255, 255, 0.10)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "70%",
                        left: "50%",
                        width: "50px",
                        height: "50px",
                        bgcolor: "rgba(255, 255, 255, 0.10)",
                        transform: "rotate(45deg)",
                    }}
                />
                <Typography
                    variant={"h3"}
                    sx={{
                        color: "white",
                        pb: "20px",
                    }}>
                    Hello, friend!
                </Typography>
                <Typography variant='body1'
                    sx={{
                        color:"white",
                        opacity:"0.50",
                        pb: "30px",
                        textAlign:"center"
                    }}>
                    Enter your username and password for start log in the aplication
                </Typography>

                <ButtonComponent text={"Sign up"} onClick={() => navigateTo("register")} />



            </Box>

        </Box>
    );
};

export default Login;