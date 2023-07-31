import React, { useState, useEffect } from 'react';
import { Avatar, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import configData from 'config';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const AvatarUpload = ({ onChange }) => {
    const [profile_pic, setProfile] = useState('');
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [company_name, setCompany] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

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
                setProfile(data.profile_pic || '');
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching default details:', error);
                // Handle the error if required
            });
    }, [account]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfile(file);
            onChange(file); // Pass the File object to the parent component
            setIsDirty(true);
        }
    };

    const handleRemoveAvatar = () => {
        setProfile('');
        onChange('');
        setIsDirty(true);
    };

    const handleSave = () => {
        const formData = new FormData();
        formData.append('user.username', username);
        formData.append('user.email', email);
        formData.append('country', country);
        formData.append('role', role);
        formData.append('phone', phone);
        formData.append('company_name', company_name);
        formData.append('profile_pic', profile_pic);
        console.log(profile_pic);
        axios
            .put(configData.API_SERVER + 'company-profile/', formData, {
                headers: {
                    Authorization: `Bearer ${account.token.access}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log('Data successfully saved:', response.data);
                setIsDirty(false);
                setSnackbarOpen(true);
            })
            .catch((error) => {
                console.error('Error saving data:', error);
                // Handle the error if required
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <label htmlFor="avatar-upload">
                    <Avatar src={profile_pic} alt="Profile Picture" sx={{ width: 120, height: 120, cursor: 'pointer' }}></Avatar>
                </label>
                <Typography variant="subtitle2">Upload/Change Your Profile Image</Typography>
            </div>
            <div>
                <input type="file" accept="image/*" id="avatar-upload" style={{ display: 'none' }} onChange={handleFileChange} />
                {isDirty ? (
                    <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleSave}>
                        Save Profile
                    </Button>
                ) : (
                    <label htmlFor="avatar-upload">
                        <Button component="span" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                            Upload Profile
                        </Button>
                    </label>
                )}
                {profile_pic && (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleRemoveAvatar}
                        style={{ marginTop: '16px', marginLeft: '16px' }}
                    >
                        Remove
                    </Button>
                )}
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    Profile successfully saved!
                </Alert>
            </Snackbar>
        </div>
    );
};
AvatarUpload.propTypes = {
    onChange: PropTypes.func.isRequired // onChange should be a required function prop
};

export default AvatarUpload;
