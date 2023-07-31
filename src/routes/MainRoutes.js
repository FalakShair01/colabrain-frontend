import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing
const Chatbox = Loadable(lazy(() => import('views/Chatbox')));
const AccountSettings = Loadable(lazy(() => import('views/AccountSettings')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/:id',
            element: (
                <AuthGuard>
                    <Chatbox />
                </AuthGuard>
            )
        },
        {
            path: '/account-settings',
            element: (
                <AuthGuard>
                    <AccountSettings />
                </AuthGuard>
            )

        }
    ]
};

export default MainRoutes;
