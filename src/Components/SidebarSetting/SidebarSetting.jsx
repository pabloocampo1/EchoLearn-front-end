
import { Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import { DarkModeOutlined, WbSunny } from '@mui/icons-material';
import LogoWeb from '../logoWeb';

const SidebarSetting = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    return (
        <Box sx={{
            width: "80%",
            height: "9vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pr: "20px",
            pl: "20px",
            position: "sticky",
            top: 0,
            left: "100%",
            bgcolor: "background.paper",
            borderBottom: "1px solid #3BB09D ",
            borderLeft: "1px solid #3BB09D ",
            borderRadius: "15px",
            zIndex: "999",
        }}>
            <LogoWeb />
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Box
                    sx={{ mr: "15px" }}
                    onClick={() => toggleDarkMode()}>
                    {darkMode ? <WbSunny sx={{ color: "primary.main", width: "25px", height: "30px" }} /> : <DarkModeOutlined sx={{ color: "primary.main", width: "30px", height: "30px" }} />}
                </Box>
                <Box
                    sx={{ mr: "15px" }}
                >
                    <SettingsIcon sx={{ color: "primary.main", width: "25px", height: "30px" }} />
                </Box>
                <Box

                >
                    <img width="25px" src="https://static.vecteezy.com/system/resources/previews/008/844/895/non_2x/user-icon-design-free-png.png" alt="jaj" />
                </Box>
            </Box>




        </Box>
    );
};

export default SidebarSetting;