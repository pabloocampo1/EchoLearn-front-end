import { ArrowLeft, JoinLeft, RotateLeftTwoTone, TurnLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const ComeBack = ({text = "Back to home"}) => {
    const navigate = useNavigate()
    return (
        <Box onClick={() => navigate("/")} sx={{display:"flex", cursor:"pointer"}}>
            <ArrowLeft />
            <Typography sx={{ml:"10px"}}>{text}</Typography>
            
        </Box>
    );
};

export default ComeBack;