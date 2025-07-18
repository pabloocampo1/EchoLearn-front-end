import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ButtonComponent from '../../Components/ButtonComponet';
import { useNavigate } from 'react-router-dom';
import InputFielEmail from '../../Components/Inputs/InputFielEmail';
import InputUserName from '../../Components/Inputs/InputUserName';
import InputPassWord from '../../Components/Inputs/InputPassword';
import { AuthContext } from '../../Context/AuthContext';
import OptionToLogin from '../../Components/AuthComponents/OptionToLogin';
import SimpleBackdrop from '../../Components/SimpleBackDrop';
import RegisterSucces from '../../Components/AuthComponents/RegisterSucces';
import LogoWeb from '../../Components/logoWeb';

const Register = () => {
    const [registerData, setRegisterData] = useState({
        password: "",
        username: "",
        email: "",
    })
    const { singUp } = useContext(AuthContext);
    const navigate = useNavigate();
    const navigateTO = (path) => navigate(path);
    const [isLoanding, setIsLoanding] = useState(false);
    const [createCount, setCreateCount] = useState(false);


    const handleInputChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    const handleInput = async (event) => {
        event.preventDefault()
        setIsLoanding(true)
        const state = await singUp(registerData)
        setRegisterData({
            password:"",
            username:"",
            email:"",
            
        })
        if (state.state) {
            setCreateCount(true)
        }else{
            setCreateCount(false)
        }
        
        setIsLoanding(false)
      
        
    };

    useEffect(() => {
        
    },[createCount])

    

    return (
        <Box sx={{ bgcolor: "background.default", height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {isLoanding && <SimpleBackdrop /> }
            <Box sx={{ bgcolor: "primary.main", width: "40%", height: "100%", position: "relative", overflow: "hidden", display: "flex", justifyContent: "start", alignItems: "center", flexDirection: "column", p: "10px 30px" }}>
                {/* figuras */}
                <Box sx={{ position: "absolute", top: "50%", left: "95%", width: "100px", height: "100px", bgcolor: "rgba(255, 255, 255, 0.10)" }} />
                <Box sx={{ position: "absolute", bottom: "0%", left: "0%", width: "200px", height: "200px", borderRadius: "0px 100% 0px 0px", bgcolor: "rgba(255, 255, 255, 0.10)" }} />
                <Box sx={{ position: "absolute", bottom: "70%", left: "50%", width: "50px", height: "50px", bgcolor: "rgba(255, 255, 255, 0.10)", transform: "rotate(45deg)" }} />


                <Box sx={{ width: "100%", height: "10%", pt:"50px" }}>
                    <LogoWeb isActive={true}/>
                </Box>
                <Box sx={{ width: "100%", height: "90%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", p: "0px 40px" }}>
                    <Typography variant='h3' sx={{ textAlign: "center", pb: "20px", color: "white" }}>WELCOME BACK!</Typography>
                    <Typography variant='body1' sx={{ textAlign: "center", pb: "40px", color: "white", opacity: "0.50" }}>Lorem ipsum dolor sipis icing elit. Quidem praesentium possimus dolorem est conseq uuntur labo riosam accus anti</Typography>
                    <ButtonComponent text="SIGN IN" colorBG={""} onClick={() => navigateTO("/login")} />
                </Box>
            </Box>

            <Box sx={{ bgcolor: "background.paper", width: "60%", height: "100%", display: "flex", alignItems: "center", flexDirection: "column", p: "20px 100px" }}>
                <Typography variant='h2' sx={{ color: "primary.main", fontWeight: "500", textAlign: "center", mt: "8vh" }}>Create Account</Typography>
                <OptionToLogin />
                <Typography variant='body1' sx={{ textAlign: "center", mb: "20px", mt: "60px", opacity: "0.50" }}>Or use your email for registration</Typography>
                {createCount ? <RegisterSucces /> : 
                (<form onSubmit={handleInput}>
                    <Box sx={{ mb: "20px", mt: "10px" }}>
                        <InputFielEmail value={registerData.email} onChange={handleInputChange} />
                    </Box>
                    <Box sx={{ mb: "20px", mt: "10px" }}>
                        <InputUserName value={registerData.username} onChange={handleInputChange} />
                    </Box>
                    <Box sx={{ mb: "20px", mt: "10px" }}>
                        <InputPassWord value={registerData.password} onChange={handleInputChange} />
                    </Box>
                    <Box sx={{ mt: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ButtonComponent text="SIGN UP" type="submit"/>
                    </Box>
                </form>)}
            </Box>
        </Box>
    );
};

export default Register;
