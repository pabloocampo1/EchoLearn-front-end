import { Box, Button } from '@mui/material';
import React from 'react';

const FinishedTimeExamCompo = ({handleClose}) => {
    return (
        <Box>
            The time finished. you lost the exam...

            <Button onClick={handleClose}>
                Home
            </Button>
        </Box>
    );
};

export default FinishedTimeExamCompo;