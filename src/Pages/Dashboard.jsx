import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Dashboard = () => {
    const {state} = useContext(AuthContext);
    return (
        <div>
            dashboard
            Hola, {state.username}
            
        </div>
    );
};

export default Dashboard;