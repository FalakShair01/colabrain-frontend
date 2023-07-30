import { useEffect, useState } from 'react';

// material-ui
import { Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import useSwrRequest from 'hooks/useSWR';
import { API_DELETE_CHAT, API_GET_ALL_CHAT } from 'config/WebServices';

import { IconMessage } from '@tabler/icons';
import useApiRequest from 'hooks/useApiRequest';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const { data, error, mutate } = useSwrRequest(API_GET_ALL_CHAT.route);
    const [menuItems, setMenuItems] = useState(menuItem);
    const { requestEndpoint } = useApiRequest(API_DELETE_CHAT.route, API_DELETE_CHAT.type);

    const _onDeleteChat = async (chatId) => {
        try {
            const response = await requestEndpoint(null, chatId);
            console.log({ response });
            mutate();
        } catch (error) {
            console.log({ error });
        }
    };

    useEffect(() => {
        console.log({ data });
        if (data?.length > 0) {
            const chats = {
                id: 'messages',
                type: 'group',
                children: []
            };

            data?.forEach((_chat) => {
                chats.children.push({
                    id: _chat.id,
                    title: _chat.title,
                    type: 'item',
                    url: `/Chatbox/${_chat.id}`,
                    icon: IconMessage,
                    breadcrumbs: false,
                    secondaryIcon: Delete,
                    onClickSecondaryIcon: () => {
                        _onDeleteChat(_chat.id);
                    }
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
