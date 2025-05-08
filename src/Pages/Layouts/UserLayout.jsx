import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import SideBar from '../../Components/SideBar/SideBar';
import { userOptions } from '../../Constants/OptionSideBarUser';
import SidebarSetting from '../../Components/SidebarSetting/SidebarSetting';

const UserLayout = () => {
    return (
        <Box sx={{
            width: "100%",
            height:"auto", 
            position: "relative", 
        }}>
             <SideBar options={userOptions} />
            <SidebarSetting />
            <Box sx={{ width: "80%", minHeight:"100vh", ml:"20%", mt:"8vh", p:"30px",  bgcolor: "background.default",  }} >
               
                <Outlet></Outlet>
            </Box>
           
        </Box>
    );
};

export default UserLayout;