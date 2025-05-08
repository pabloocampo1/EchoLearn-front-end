import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Profile = () => {
    const  {state} = useContext(AuthContext);

    return (
        <div>
            soy el profile de: {state.username}
        </div>
    );
};

export default Profile;