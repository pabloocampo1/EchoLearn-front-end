import { Box, Button } from '@mui/material';
import React from 'react';

function ButtonComponent({text, onClick, colorBG, type, width = "150px", height = "45px", icon }) {
    return (
        <Box sx={{display:"flex", justifyContent:"center"}}>
            <Button
                sx={{
                    borderRadius: "15px",
                    minWidth: width,
                    minHeight: height,
                    bgcolor: colorBG,
                    color:"white",
                    border: "1px solid white",
                    boxShadow:"none"
                }}
                onClick={onClick}
                type={type}
                variant="contained"
            >{text} {icon}</Button>
        </Box>
    );
}

export default ButtonComponent;