import { useEffect, useState } from 'react';

// material-ui
import { Divider, Typography } from '@mui/material';

// project imports
import menuItem2 from 'menu-items/menu-items-2';
import { Delete } from '@mui/icons-material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import useSwrRequest from 'hooks/useSWR';
import { API_DELETE_CHAT, API_GET_ALL_CHAT } from 'config/WebServices';

import { IconMessage } from '@tabler/icons';
import useApiRequest from 'hooks/useApiRequest';

import { useSelector } from 'react-redux';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const { token } = useSelector((state) => state.account);
    const { data, error, mutate } = useSwrRequest(API_GET_ALL_CHAT.route, token?.access);
    const [menuItems, setMenuItems] = useState(menuItem);
    const { requestEndpoint } = useApiRequest(API_DELETE_CHAT.route, API_DELETE_CHAT.type, token?.access);

    const _onDeleteChat = async (chatId) => {
        try {
            const response = await requestEndpoint(null, chatId);
            mutate();
        } catch (error) {
            console.log({ error });
        }
    };

    useEffect(() => {
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
                    url: `/${_chat.id}`,
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
            <div>{navItems}</div>

            <div style={{ position: 'absolute', bottom: '4rem', width: '87%' }}>
                <Divider />
                {navItems2}
            </div>
        </>
    );
};

export default MenuList;
