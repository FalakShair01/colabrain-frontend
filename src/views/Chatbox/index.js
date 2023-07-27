import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Paper } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '63vh',
    height: '63vh',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3), // Add a gap of 3 spacing units at the bottom
    backgroundColor: '#F8FAFC',
    borderRadius: theme.spacing(1)
}));

const MessageContainer = styled(PerfectScrollbar)(({ theme }) => ({
    flex: 1,
    marginBottom: theme.spacing(2),
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column'
}));

const ChatBox = () => {
    const [messages, setMessages] = useState([]);

    const getTimeStamp = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amPM = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${amPM}`;
    };

    const handleSend = (message) => {
        setMessages((prevMessages) => [...prevMessages, { text: message, time: getTimeStamp(), isUserMessage: true }]);

        // Simulate a reply message after a short delay (here, 1 second)
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'This is a reply message!', time: getTimeStamp(), isUserMessage: false }
            ]);
        }, 1000);
    };

    return (
        <div>
            <ChatContainer elevation={3}>
                <MessageContainer>
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} text={msg.text} time={msg.time} isUserMessage={msg.isUserMessage} />
                    ))}
                </MessageContainer>
                <ChatInput onSend={handleSend} />
            </ChatContainer>
        </div>
    );
};

export default ChatBox;
