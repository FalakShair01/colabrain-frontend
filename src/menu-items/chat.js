// assets
import { IconPlus, IconHelp } from '@tabler/icons';

// constant
const icons = { IconPlus, IconHelp };

// ==============================|| New Chat ||============================== //

const chat = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'new-chat',
            title: 'New Chat',
            type: 'item',
            url: '/Chatbox',
            icon: icons.IconPlus,
            breadcrumbs: false
        }
    ]
};

export default chat;
