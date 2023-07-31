import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Paper, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { useParams } from 'react-router-dom';
import useSwrRequest from 'hooks/useSWR';
import { API_CHAT_ADD_MESSAGE, API_GET_CHAT } from 'config/WebServices';
import useApiRequest from 'hooks/useApiRequest';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useSelector } from 'react-redux';

const ChatContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
    height: '74vh',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3), // Add a gap of 3 spacing units at the bottom
    backgroundColor: '#FAFAFA',
    borderRadius: theme.spacing(2),
    border: '1px solid #CAE5FA'
    // position: 'absolute',
    // bottom: '5rem',
    // top: '6rem',
    // right: '2rem',
    // left: '2rem'
}));

const MessageContainer = styled(PerfectScrollbar)(({ theme }) => ({
    flex: 1,
    marginBottom: theme.spacing(2),
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column'
}));

const Message = styled(Typography)(({ theme, isChatBot }) => ({
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: '#E3F2FD',
    color: '#364152',
    alignSelf: isChatBot ? 'flex-start' : 'flex-end'
}));

const InputContainer = styled('div')(({}) => ({
    display: 'flex'
}));

const Input = styled(TextField)(({ theme }) => ({
    flex: 1,
    marginRight: theme.spacing(1)
}));

const SendButton = styled(Button)(({ theme }) => ({
    minWidth: 'unset',
    width: '40%',
    marginRight: '-1.8rem', // Adjust the width based on the content (text/icon)
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    color: theme.palette.primary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText
    }
}));

const ChatBox = () => {
    const { token } = useSelector((state) => state.account);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { id } = useParams();

    const { data, error, mutate } = useSwrRequest(`${API_GET_CHAT.route}${id}/`, token?.access);
    const { requestEndpoint } = useApiRequest(API_CHAT_ADD_MESSAGE.route, API_CHAT_ADD_MESSAGE.type, token?.access);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = async () => {
        try {
            const body = {
                chat_id: id,
                req: message
            };
            const response = await requestEndpoint(body);

            if (message.trim() !== '') {
                // setMessages((prevMessages) => [...prevMessages, message.trim()]);
                setMessage('');
            }
            mutate();
        } catch (error) {
            console.log({ error }, '====');
        }
    };

    return (
        <div>
            <ChatContainer elevation={3}>
                <MessageContainer>
                    {data?.messages?.map(({ id, req: _message, res: _chatBot }) => (
                        <>
                            <Message key={id + _message} variant="body2">
                                {_message}
                            </Message>
                            <Message key={id + _chatBot} variant="body2" isChatBot>
                                {_chatBot}
                            </Message>
                        </>
                    ))}
                </MessageContainer>
                <InputContainer>
                    <Input
                        label="Type a message"
                        variant="outlined"
                        value={message}
                        onChange={handleInputChange}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                handleSend();
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SendButton variant="contained" disabled={!message.trim()} onClick={handleSend}>
                                        <SendOutlinedIcon />
                                    </SendButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </InputContainer>
            </ChatContainer>
        </div>
    );
};

export default ChatBox;
