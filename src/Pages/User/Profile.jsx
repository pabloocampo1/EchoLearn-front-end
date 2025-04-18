import { Box } from '@mui/material';
import React from 'react';

const Profile = () => {
    const user= localStorage.getItem("userAuth");
    const userEx = JSON.parse(user);
    console.log(userEx);
    
    return (
        <Box sx={{width:"100%", height:"80vh", bgcolor:"RED", p:"0px 150px"}}>
           SOY EL PERFIL, {userEx.role}
        </Box>
    );
};

export default Profile;