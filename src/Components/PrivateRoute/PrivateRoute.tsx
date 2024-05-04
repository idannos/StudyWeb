import React, {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
    children: ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const isAuthenticated = localStorage.getItem('accessToken'); // Replace with more secure auth check as needed

    return (
        <div>
            {isAuthenticated ? children : <Navigate to="/" replace/>}
        </div>
    );
};

export default PrivateRoute;
