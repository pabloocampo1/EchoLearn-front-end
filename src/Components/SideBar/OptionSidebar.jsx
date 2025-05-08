import { Box, Typography } from '@mui/material';
import React from 'react';

const OptionSidebar = ({ title, img, active, onClick }) => {
    return (
        <Box   onClick={onClick} sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            borderLeft: "7px solid",
            borderColor: active ? "primary.main" : "background.paper",
            bgcolor:active ? "background.default" : "background.paper",
            p:"20px 40px"
        }}
       
        >
           
           {img}
           <Typography sx={{color: active ? "primary.main" : "", pl:"10px"}}>
                {title}
           </Typography>
        </Box>
    );
};

export default OptionSidebar;