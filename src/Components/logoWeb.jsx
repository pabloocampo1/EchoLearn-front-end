import { Box, Typography } from '@mui/material';
import React from 'react';
import image from "../assets/undraw_books_wxzz (1).svg"

const LogoWeb = ({isActive}) => {
    return (
        <Box sx={{width:"auto", display:"flex", justifyContent:"center", alignItems:"center"}}>
           <img width={50} src= {image} /> 
           <Box >
            <Typography  sx={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"25px"}} ><Typography component="span" sx={{color: isActive ? "white" : "#3BB09D" , fontWeight:700, fontSize:"30px"}}>Echo</Typography>Learn</Typography>
           </Box>
        </Box>
    );
};

export default LogoWeb;