
import {  Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import { DarkModeOutlined, WbSunny } from '@mui/icons-material';

const SidebarSetting = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    return (
        <Box sx={{
            width: "80%",
            height: "9vh",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            pr: "40px",
            position: "fixed",
            top: 0,
            right: 0,
            bgcolor: "background.paper",
            borderBottom: "1px solid #3BB09D ",
            borderLeft: "1px solid #3BB09D ",
            borderRadius:"15px"
        }}>
            <Box
                sx={{ mr: "15px" }}
                onClick={() => toggleDarkMode()}>
                {darkMode ? <WbSunny sx={{ color: "primary.main", width: "30px", height: "30px"  }} /> : <DarkModeOutlined sx={{ color: "primary.main", width: "30px", height: "30px"  }} />}
            </Box>
            <Box
                sx={{ mr: "15px" }}
            >
                <SettingsIcon sx={{ color: "primary.main",  width: "30px", height: "30px" }} />
            </Box>
            <Box
                sx={{ mr: "15px" }}
            >
                <img width="30px" src="https://static.vecteezy.com/system/resources/previews/008/844/895/non_2x/user-icon-design-free-png.png" alt="jaj" />
            </Box>




        </Box>
    );
};

export default SidebarSetting;