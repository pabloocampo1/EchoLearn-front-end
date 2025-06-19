import * as React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';



export default function GenericModal({ open, handleClose, compo }) {


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: 400,
                bgcolor: 'background.paper',
                p: 4,
                borderRadius:"15px"

            }}>
                {compo}
            </Box>
        </Modal >

    );
}
