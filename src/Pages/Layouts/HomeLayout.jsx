import { Box } from '@mui/material';
import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <Box sx={{
            width:"100%",
            height:"auto",
        }}>
            <Header />
                <Box sx={{pt:"40px"}}>
                    <Outlet></Outlet>
                </Box>
            <Footer />
        </Box>
    );
};

export default HomeLayout;