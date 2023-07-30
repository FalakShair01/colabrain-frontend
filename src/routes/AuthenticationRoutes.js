import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import GuestGuard from 'utils/route-guard/GuestGuard';
import AuthGuard from 'utils/route-guard/AuthGuard';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const Logout = Loadable(lazy(() => import('views/pages/authentication/authentication3/Logout')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: (
                <GuestGuard>
                    <AuthLogin3 />
                </GuestGuard>
            )
        },
        {
            path: '/register',
            element: (
                <GuestGuard>
                    <AuthRegister3 />
                </GuestGuard>
            )
        },
        {
            path: '/logout',
            element: (
                <AuthGuard>
                    <Logout />
                </AuthGuard>
            )
        }
    ]
};

export default AuthenticationRoutes;
