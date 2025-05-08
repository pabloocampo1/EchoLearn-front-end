import { Box, Button } from '@mui/material';
import React from 'react';

function ButtonComponent({text, onClick, colorBG, type}) {
    return (
        <Box sx={{display:"flex", justifyContent:"center"}}>
            <Button
                sx={{
                    borderRadius: "15px",
                    minWidth: "150px",
                    minHeight:"45px",
                    bgcolor: colorBG,
                    color:"white",
                    border: "1px solid white",
                    boxShadow:"none"
                }}
                onClick={onClick}
                type={type}
                variant="contained"
            >{text}</Button>
        </Box>
    );
}

export default ButtonComponent;