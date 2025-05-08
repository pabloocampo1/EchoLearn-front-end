import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import ButtonComponent from '../../Components/ButtonComponet';
import { Link, useNavigate } from 'react-router-dom';
import OptionToLogin from '../../Components/AuthComponents/OptionToLogin';
import InputUserName from '../../Components/Inputs/InputUserName';
import InputPassWord from '../../Components/Inputs/InputPassword';
import { AuthContext } from '../../Context/AuthContext';
import SimpleBackdrop from '../../Components/SimpleBackDrop';


const Login = () => {
    const { singIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userDataCredential, setUserDataCredential] = useState({
        username: "",
        password: "",
    });
    const [isloanding, setIsloanding] = useState(false);
    const [incorretCredential, setIncorrectCredential] = useState(false);


    const handleInputChange = (event) => {
        setUserDataCredential({
            ...userDataCredential,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsloanding(true)
        try {
            await singIn(userDataCredential)
            setIncorrectCredential(false)
        } catch (error) {
            console.log(error);
            setIncorrectCredential(true);
        }

        setUserDataCredential({
            username: "",
            password: "",
        })
        setIsloanding(false)

    }

    const navigateTo = (path) => {
        navigate(path)
    }


    return (
        <Box sx={{ bgcolor: "background.default", height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", }}>
            {isloanding && <SimpleBackdrop />}
            <Box sx={{
                bgcolor: "background.paper",
                width: "60%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "0px 10px"
            }}>
                <Typography variant='h2' sx={{ color: "primary.main", fontWeight: "500", textAlign: "center", mt: "5%" }}>SIGN UP</Typography>
                <OptionToLogin />


                <Typography variant='body1' sx={{ opacity: "0.80", pt: "50px", pb: "10px" }}>Or use your credentials</Typography>
                <Typography variant='a' sx={{ opacity: "0.60", cursor: "pointer", textDecorationLine: "underline" }} onClick={() => navigateTo("singUp")}>You don't have a acount? create one here! </Typography>

                <form onSubmit={handleSubmit}>

                    <Box sx={{ mb: "20px", mt: "10px" }}>
                        <InputUserName value={userDataCredential.username} onChange={handleInputChange} />
                    </Box>
                    <Box sx={{ mb: "20px", mt: "10px" }}>
                        <InputPassWord value={userDataCredential.password} onChange={handleInputChange} />
                    </Box>
                    {incorretCredential && <Typography sx={{ color: "red", textAlign:"center", fontWeight:"400" }}>Incorrect credentials</Typography>}
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant='a' sx={{ opacity: "0.60", cursor: "pointer", textDecorationLine: "underline" }} onClick={() => navigateTo("changePasswordRequest")}>Forgot your password? </Typography>
                    </Box>
                   
                    <Box sx={{ mt: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ButtonComponent text="SIGN IN" type="submit" />
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
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "0px 110px"
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
                        color: "white",
                        opacity: "0.50",
                        pb: "30px",
                        textAlign: "center"
                    }}>
                    Enter your username and password for start log in the aplication
                </Typography>

                <ButtonComponent text={"Sign up"} onClick={() => navigateTo("singUp")} />



            </Box>

        </Box>
    );
};

export default Login;