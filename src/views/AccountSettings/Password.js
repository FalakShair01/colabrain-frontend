import { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

const Password = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your logic to save the edited details and password
        console.log('Details updated successfully!');
    };

    const handleClear = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
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
        </form>
    );
};

export default Password;
