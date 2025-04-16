import { Box } from '@mui/material';
import React from 'react';

const OptionToLogin = () => {
    return (
        <Box sx={{ width: "100%", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", mt: "15px" }}>
            {["f", "G+", "In"].map((icon, index) => (
                <Box key={index} sx={{ width: "50px", height: "50px", borderRadius: "100%", border: "1px solid rgb(210, 209, 209)", display: "flex", alignItems: "center", justifyContent: "center", mr: "10px", fontWeight: "bold" }}>{icon}</Box>
            ))}
        </Box>
    );
};

export default OptionToLogin;