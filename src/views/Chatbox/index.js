import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Paper, Typography, TextField, Button } from '@mui/material';

const ChatContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    padding: theme.spacing(2),
    backgroundColor: 'transparent',
    borderRadius: theme.spacing(1)
}));

const MessageContainer = styled('div')(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end' // Align messages to the right side
}));

const Message = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
}));

const InputContainer = styled('div')(({}) => ({
    display: 'flex'
}));

const Input = styled(TextField)(({ theme }) => ({
    flex: 1,
    marginRight: theme.spacing(1)
}));

const SendButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark
    }
}));

const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = () => {
        if (message.trim() !== '') {
            setMessages((prevMessages) => [...prevMessages, message.trim()]);
            setMessage('');
        }
    };

    return (
        <div>
            <ChatContainer elevation={3}>
                <MessageContainer>
                    {messages.map((msg, index) => (
                        <Message key={index} variant="body2">
                            {msg}
                        </Message>
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
                    />
                    <SendButton variant="contained" onClick={handleSend}>
                        Send
                    </SendButton>
                </InputContainer>
            </ChatContainer>
        </div>
    );
};

export default ChatBox;
