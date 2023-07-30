import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                padding: '1rem',
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                textAlign: 'center'
            }}
        >
            <Divider sx={{ marginBottom: '0.5rem' }} />
            <Typography variant="body2" color="textSecondary">
                &copy; 2023 Made with <FavoriteIcon fontSize="small" sx={{ color: '#673ab7', fontSize: '1rem' }} /> by Colabrain
            </Typography>
        </Box>
    );
};

export default Footer;
