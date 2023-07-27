// assets
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

// constant
const icons = { QuestionAnswerOutlinedIcon };

// ==============================|| New Chat ||============================== //

const chat = {
    id: 'chat',
    type: 'group',
    children: [
        {
            id: 'chat',
            title: 'Chat',
            type: 'item',
            url: '/',
            icon: icons.QuestionAnswerOutlinedIcon,
            breadcrumbs: true
        }
    ]
};

export default chat;
