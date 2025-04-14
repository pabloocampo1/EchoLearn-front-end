import React from 'react';

const AdminLayout = () => {
    return (
        <Box>
            <Box> header</Box>
            <Outlet></Outlet>
            <Box>
                footer
            </Box>
        </Box>
    );
};

export default AdminLayout;