import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Box } from '@mui/material';

const Dashboard = () => {
    const {state} = useContext(AuthContext);

    console.log(state);
    
    return (
        <Box sx={{width:"100%", minHeight:"auto", }}>
            dashboard jej
            Hola, {state.username}
            fdfd
            <br />
            fdfd
            <br />
            
        </Box  >
    );
};

export default Dashboard;