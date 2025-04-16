import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterSucces = () => {
    const navigate = useNavigate();

    

    return (
        <Box
        sx={{
            width:"200px",
            height:"200px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            
        }}>
            <Typography component="p" sx={{textAlign:"center", mb:"20px"}}>Your count was create succesfully¡</Typography>
            <Button variant='outlined' onClick={() => navigate("/login")}>Go to singIn</Button>
        </Box>
    );
};

export default RegisterSucces;