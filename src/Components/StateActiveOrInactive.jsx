import { Box, Typography } from '@mui/material';
import React from 'react';

const StateActiveOrInactive = ({text, state}) => {
    return (
        <Box sx={{width:"100px"}}>
            {state 
            ? (<Typography sx={{bgcolor:"green",p:"5px 0px",color:"white",  textAlign:"center", borderRadius:"20px"}}>{text}</Typography>)
            : (<Typography sx={{bgcolor:"red", p:"5px 0px", color:"white", textAlign:"center",borderRadius:"20px"}}>{text}</Typography>)
            }
        </Box>
    );
};

export default StateActiveOrInactive;