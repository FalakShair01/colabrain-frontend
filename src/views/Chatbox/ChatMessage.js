import { styled } from '@mui/system';

const MessageContainer = styled('div')(({ theme, isUserMessage }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: isUserMessage ? '#E3F2FD' : '#EDE7F6',
    color: isUserMessage ? '#364152' : '#364152',
    alignSelf: isUserMessage ? 'flex-end' : 'flex-start',
    display: 'flex',
    flexDirection: 'column'
}));

const Timestamp = styled('small')({
    marginLeft: 0
});

const ChatMessage = ({ text, time, isUserMessage }) => (
    <MessageContainer isUserMessage={isUserMessage}>
        {text}
        <Timestamp>{time}</Timestamp>
    </MessageContainer>
);

export default ChatMessage;
