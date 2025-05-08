import { AccountCircle } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import React from 'react';

const InputUserName = ({value, onChange}) => {
    return (
        <Box sx={{
            bgcolor:"rgba(59, 176, 157, 0.05)",
            width:{
                xs:"200px",
                md:"350px"
            },
        }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />  
                <TextField 
                id="input-with-sx" 
                required 
                value={value}
                label="Username" 
                name='username'
                variant="standard"
                onChange={onChange} 
                sx={{width:"100%"}} />
            </Box>
        </Box>
    );
};

export default InputUserName;