import { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

const countries = ['Pakistan', 'USA', 'Canada', 'UK', 'Australia', 'Germany']; // You can customize the list of countries

const EditDetails = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [country, setCountry] = useState('USA');
    const [dateOfBirth, setDateOfBirth] = useState('1990-01-01');
    const [phoneNumber, setPhoneNumber] = useState('+1 123-456-7890');
    const [company, setCompany] = useState('Colabrain');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data object to be sent in the request body
        const data = {
            name,
            email,
            country,
            dateOfBirth,
            phoneNumber,
            company
        };

        try {
            const response = await fetch('http://falak.pythonanywhere.com/api/company-profile/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                // If the response is successful, you can handle the success message or perform any other actions
                console.log('Details updated successfully!');
                console.log('Response:', responseData);
            } else {
                // If the response is not successful, handle the error
                console.log('Failed to update details.');
                console.log('Error:', responseData.error);
            }
        } catch (err) {
            console.error('Error occurred while updating details:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={1}>
                <Grid item xs={12} sm={12} lg={12}>
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" required fullWidth />
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
            <Grid container direction="row" spacing={1}>
                <Grid item xs={12} sm={12} lg={6}>
                    <FormControl style={{ width: '100%', marginTop: '16px' }} required>
                        <InputLabel>Country</InputLabel>
                        <Select value={country} onChange={(e) => setCountry(e.target.value)}>
                            {countries.map((country) => (
                                <MenuItem key={country} value={country}>
                                    {country}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <TextField
                        type="date"
                        label="Date of Birth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <TextField
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <TextField
                        label="Company"
                        value={company}
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
        </form>
    );
};

export default EditDetails;
