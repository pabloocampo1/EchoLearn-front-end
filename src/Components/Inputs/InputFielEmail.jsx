import { Box, TextField } from '@mui/material';
import React from 'react';
import EmailIcon from '@mui/icons-material/Email';

const InputFielEmail = ({value, onChange}) => {
    return (
        <Box sx={{
            bgcolor:"rgba(59, 176, 157, 0.05);",
            width:{
                xs:"200px",
                md:"350px"
            },
        }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />  
                <TextField 
                id="input-with-sx" 
                type='email' 
                required
                onChange={onChange}
                name='email'
                label="Email" 
                value={value}
                variant="standard" 
                sx={{width:"100%"}} />
            </Box>
        </Box>
    );
};

export default InputFielEmail;