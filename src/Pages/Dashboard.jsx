import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Box } from '@mui/material';

const Dashboard = () => {
    const {state} = useContext(AuthContext);

    console.log(localStorage.getItem("userAuth"));
    
    return (
        <Box >
            dashboard
            Hola, {state.username}
        
        </Box  >
    );
};

export default Dashboard;