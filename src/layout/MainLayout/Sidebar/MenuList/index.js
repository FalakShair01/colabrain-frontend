// material-ui
import { Divider, Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem1 from 'menu-items';
import menuItem2 from 'menu-items/menu-items-2';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const navItems1 = menuItem1.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });
    const navItems2 = menuItem2.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <>
            <div>{navItems1}</div>

            <div style={{ position: 'absolute', bottom: '4rem', width: '87%' }}>
                <Divider />
                {navItems2}
            </div>
        </>
    );
};

export default MenuList;
