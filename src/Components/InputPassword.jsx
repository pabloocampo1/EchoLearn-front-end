import { AccountCircle } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import React from 'react';
import PasswordIcon from '@mui/icons-material/Password';


const InputPassWord = ({value, onChange}) => {
    return (
        <Box sx={{
            bgcolor: "rgba(59, 176, 157, 0.05);"
        }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> 
                <TextField
                    id="input-with-sx"
                    type='password'
                    name='password'
                    required
                    value={value}
                    onChange={onChange}
                    label="Password"
                    variant="standard"
                    sx={{ width: "350px" }} />
            </Box>
        </Box>
    );
};

export default InputPassWord;