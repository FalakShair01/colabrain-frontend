// assets
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

// constant
const icons = { PersonPinOutlinedIcon, LogoutOutlinedIcon, PeopleAltOutlinedIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const account = {
    id: 'account',
    title: 'Account Settings',
    type: 'group',
    children: [
        {
            id: 'account',
            title: 'User Profile',
            type: 'item',
            url: '/account-settings',
            icon: icons.PersonPinOutlinedIcon,
            breadcrumbs: true
        },
        {
            id: 'users',
            title: 'Users List',
            type: 'item',
            url: '/users-list',
            icon: icons.PeopleAltOutlinedIcon,
            breadcrumbs: true
        },
        {
            id: 'logout',
            title: 'Logout',
            type: 'item',
            url: '/logout',
            icon: icons.LogoutOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default account;
