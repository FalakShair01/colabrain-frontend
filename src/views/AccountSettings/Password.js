import React, { useState } from 'react';
import { Button, Grid, TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useSelector } from 'react-redux';
import configData from 'config';
const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);
const Password = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const account = useSelector((state) => state.account);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirm password don't match.");
            setSnackbarOpen(true);
            return;
        }

        const data = {
            old_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword
        };

        try {
            const response = await axios.post(configData.API_SERVER + 'change-password/', data, {
                headers: {
                    Authorization: `Bearer ${account.token.access}`
                }
            });
            if (response.status === 200) {
                setSuccessMessage('Password changed successfully!');
                setSnackbarOpen(true);
                // Implement any additional logic you need here
            } else {
                setErrorMessage('Failed to change password.');
                setSnackbarOpen(true);
                console.log('Error:', response.data.error);
            }
        } catch (error) {
            setErrorMessage('Error occurred while changing password.');
            setSnackbarOpen(true);
            console.error('Error occurred while changing password:', error);
        }
    };

    const handleClear = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} sm={12} lg={6}>
                    <TextField
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} sm={12} lg={6}>
                    <TextField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                    />
                </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
                    Change Password
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClear} style={{ marginLeft: '16px', marginTop: '16px' }}>
                    Clear
                </Button>
            </div>

            {/* Snackbar to show success and error messages */}
            <Snackbar open={isSnackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={successMessage ? 'success' : 'error'}>
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default Password;
