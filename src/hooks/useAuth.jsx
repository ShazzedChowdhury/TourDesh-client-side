import React, { use } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAuth = () => {
    const authData = use(AuthContext);
    return authData
};

export default useAuth;