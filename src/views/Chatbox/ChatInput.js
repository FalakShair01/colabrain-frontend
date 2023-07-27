import { useState } from 'react';
import { styled } from '@mui/system';
import { TextField, Button, InputAdornment } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

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

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSend = () => {
        if (message.trim() !== '') {
            onSend(message.trim());
            setMessage('');
        }
    };

    return (
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
    );
};

export default ChatInput;
