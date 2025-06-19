import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import SidebarSetting from '../../Components/SidebarSetting/SidebarSetting';
import {adminOptions} from "../../Constants/OptionSidebarAdmin"


const AdminLayout = () => {
   
    return (
        <Box sx={{ 
            width: "100%",
            height:"auto", 
            position: "relative", 
        }}>
            <SideBar options={adminOptions} />
            <SidebarSetting />
            <Box sx={{ width: "80%", minHeight:"100vh", ml:"20%",  p:"30px",  bgcolor: "background.default",  }} >
               
                <Outlet></Outlet>
            </Box>


        </Box>
    );
};

export default AdminLayout;