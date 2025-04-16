import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';



const AdminLayout = () => {
    return (
        <Box>
            <Box> sdsdsdsdsdddddddddddddddddddddddddddddddddddddddddd</Box>
            <Outlet></Outlet>
            <Box>
                footer
            </Box>
        </Box>
    );
};

export default AdminLayout;