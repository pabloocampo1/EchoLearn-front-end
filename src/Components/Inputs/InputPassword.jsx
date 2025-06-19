import { AccountCircle } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import React from 'react';
import PasswordIcon from '@mui/icons-material/Password';


const InputPassWord = ({value, onChange}) => {
    return (
        <Box sx={{
            bgcolor: "rgba(59, 176, 157, 0.05)",
            width:{
                xs:"200px",
                md:"350px"
            },
          
        }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> 
                <TextField
                    id="78788"
                    type='password'
                    autoComplete='new-password'
                    name='password'
                    required
                    value={value}
                    onChange={onChange}
                    label="Password"
                    variant="standard"
                    sx={{ width: "100%" }} />
            </Box>
        </Box>
    );
};

export default InputPassWord;