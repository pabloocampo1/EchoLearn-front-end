import React, { useEffect, useState } from 'react';
import SimpleBackdrop from '../../Components/SimpleBackDrop';
import axiosInstance from '../../Service/Api';
import { Box, Typography } from '@mui/material';
import LogoWeb from '../../Components/logoWeb';
import ButtonComponent from '../../Components/ButtonComponet';
import InputPassWord from '../../Components/Inputs/InputPassword';
import { useNavigate } from 'react-router-dom';

const ChangeCredential = ({code}) => {
    const [isLoanding, setIsloanding] = useState(false);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState();
    const [errorToChangePassword, setErrorToChangePassword] = useState();
    const [errorNotEqualPassword, setErrorNotEqualPassword] = useState();
    const [errorPasswordShort, setErrorPasswordShort] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const navigate = useNavigate()
    

    const changePassword = async () => {
        console.log({
            "token":code,
            "password":password1,
        });
        
        try{
            const response = await axiosInstance.post("/api/auth/resetPassword", {
                "token":code,
                "password":password1,
            })
            console.log(response);
            if (response.data) {
                setErrorToChangePassword(false)
                setPasswordChanged(true)
            }
            
        }catch(error) {
            console.log(error);
            setErrorToChangePassword(true)
            
        }
    }


    const handleFormPassword = async (e) => {
        e.preventDefault();
        setIsloanding(true)
        if(password1 === password2){
            if (password1.length >= 8) {
                setErrorNotEqualPassword(false)
                await changePassword();
               
            }else{
               setErrorPasswordShort(true)  
            } 
        }else{
            setErrorNotEqualPassword(true)
        }

        setPassword1("")
        setPassword2("")
        setIsloanding(false);
    }

    const handleInputPassword1 = (e) => {
        setPassword1(e.target.value)
    }
    const handleInputPassword2 = (e) => {
        setPassword2(e.target.value)
    }

    useEffect(() => {
        const validateCode = async () => {
            try {
                const response = await axiosInstance.get("/api/auth/codeValid/"+ code);
                console.log(response);
                if(!response.data){
                    navigate("/login")
                }
            } catch (error) {
                console.error(error);
                navigate("/login")
            }
        }

        validateCode();

    }, [passwordChanged])

    return (
        <Box sx={{ width: "100vw", height: "100vh", bgcolor: "background.default", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {isLoanding && <SimpleBackdrop />}
            <Box sx={{ width: "50%", height: "50%", bgcolor: "background.paper", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column", borderRadius: "15px", p: "20px" }}>
                <Box sx={{ position: "absolute", top: "5%", left: "5%" }}>
                    <LogoWeb></LogoWeb>
                </Box>
                <Typography variant='h6' sx={{ color: "primary.main" }}>CHANGE PASSWORD</Typography>
                <Typography sx={{ opacity: "0.50", textAlign: "center" }}>Insert your NEW PASSWORD </Typography>
                {errorToChangePassword && (<Typography sx={{ color: "red" }}>something wrong, try again, or validate your email</Typography>)}
                <form onSubmit={handleFormPassword}>
                    <InputPassWord value={password1} onChange={handleInputPassword1} />
                    <br />
                    <InputPassWord value={password2} onChange={handleInputPassword2} />
                    <br />
                    {errorNotEqualPassword && (<Typography sx={{ color: "red", textAlign:"center" }}>The password no its equals</Typography>) }
                    {errorPasswordShort && (<Typography sx={{ color: "red", textAlign:"center", pb:"10px" }}>The password no too short, must have more tan 8 digits</Typography>) }
                    <ButtonComponent text={"Send"} type={"submit"} />
                </form>
            </Box>



        </Box>
    );
};

export default ChangeCredential;