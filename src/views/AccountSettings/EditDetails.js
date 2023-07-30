import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl, MenuItem, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useSelector } from 'react-redux';
import configData from 'config';

const countries = ['Pakistan', 'USA', 'Canada', 'UK', 'Australia', 'Germany'];
const roles = ['organization', 'Admin', 'Manager', 'Employee'];
const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const EditDetails = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [company_name, setCompany] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
    const account = useSelector((state) => state.account);

    useEffect(() => {
        axios
            .get(configData.API_SERVER + 'company-profile/', {
                headers: {
                    Authorization: `Bearer ${account.token.access}`
                }
            })
            .then((response) => {
                const data = response.data;
                setName(data.user.username || '');
                setEmail(data.user.email || '');
                setCountry(data.country || '');
                setPhoneNumber(data.phone || '');
                setCompany(data.company_name || '');
                setRole(data.role || '');
            })
            .catch((error) => {
                console.error('Error fetching default details:', error);
                // Handle the error if required
            });
    }, [account]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data object to be sent in the request body
        const formData = new FormData();
        formData.append('user.username', username);
        formData.append('user.email', email);
        formData.append('country', country);
        formData.append('role', role);
        formData.append('phone', phone);
        formData.append('company_name', company_name);

        try {
            const response = await axios.put(configData.API_SERVER + 'company-profile/', formData, {
                headers: {
                    Authorization: `Bearer ${account.token.access}`
                }
            });

            if (response.status === 200) {
                setSnackbarOpen(true);
                // ... Rest of the code ...
            } else {
                // ... Rest of the code ...
            }
        } catch (err) {
            console.error('Error occurred while updating details:', err);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={0.5}>
                <Grid item xs={12} sm={12} lg={12}>
                    <TextField
                        label="User Name"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={12} lg={6}>
                    <FormControl style={{ width: '100%', marginTop: '16px' }} required>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            fullWidth
                        >
                            {countries.map((country) => (
                                <MenuItem key={country} value={country}>
                                    {country}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <FormControl style={{ width: '100%', marginTop: '16px' }} required>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Role"
                            fullWidth
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <TextField
                        label="Phone Number"
                        value={phone}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <TextField
                        label="Company"
                        value={company_name}
                        onChange={(e) => setCompany(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                    />
                </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
                    Save Changes
                </Button>
            </div>

            {/* Snackbar to show success message */}
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    Details updated successfully!
                </Alert>
            </Snackbar>
        </form>
    );
};

export default EditDetails;
