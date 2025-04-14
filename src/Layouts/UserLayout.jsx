import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const UserLayout = () => {
    return (
        <Box sx={{
            width:"100%",
            height:"auto",
        }}>
            <Header />
            <Outlet></Outlet>
            <Footer />
        </Box>
    );
};

export default UserLayout;