import { useEffect, useState } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import useSwrRequest from 'hooks/useSWR';
import { API_GET_ALL_CHAT } from 'config/WebServices';

import { IconMessage } from '@tabler/icons';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const { data, error } = useSwrRequest(API_GET_ALL_CHAT.route);
    const [menuItems, setMenuItems] = useState(menuItem);

    useEffect(() => {
        if (data?.length > 0) {
            const chats = {
                id: 'sample-docs-roadmap',
                type: 'group',
                children: []
            };

            data.forEach((_chat) => {
                chats.children.push({
                    id: _chat.id,
                    title: _chat.title,
                    type: 'item',
                    url: `/Chatbox/${_chat.id}`,
                    icon: IconMessage,
                    breadcrumbs: false
                });
            });

            setMenuItems({ items: [...menuItem.items, chats] });
        }
    }, [data]);

    const navItems = menuItems.items.map((item) => {
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

    return <>{navItems}</>;
};

export default MenuList;
