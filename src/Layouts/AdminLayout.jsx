import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../Components/SideBar/SideBar';



const AdminLayout = () => {
    return (
        <Box sx={{width:"100vw", height:"100vh", display:"flex"}}>
            <SideBar />
           <Box sx={{width:"75vw", height:"100vh", bgcolor:"background.defualt"}} >
           <Outlet></Outlet>
           </Box>
            
        </Box>
    );
};
  
export default AdminLayout;