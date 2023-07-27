import { useState } from 'react';
import { Avatar, Button, Typography } from '@mui/material';

const AvatarUpload = ({ onChange, currentAvatar }) => {
    const [avatarPreview, setAvatarPreview] = useState(currentAvatar || '');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
                onChange(reader.result);
            };
        }
    };

    const handleRemoveAvatar = () => {
        setAvatarPreview('');
        onChange('');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {avatarPreview ? (
                    <div style={{ marginBottom: '16px' }}>
                        <Avatar src={avatarPreview} alt="Profile Picture" sx={{ width: 120, height: 120 }} />
                    </div>
                ) : (
                    <div style={{ marginBottom: '16px' }}>
                        <Avatar alt="Blank Avatar" sx={{ width: 120, height: 120 }} />
                    </div>
                )}
                <Typography variant="subtitle2">Upload/Change Your Profile Image</Typography>
            </div>
            <div>
                <input type="file" accept="image/*" id="avatar-upload" style={{ display: 'none' }} onChange={handleFileChange} />
                <label htmlFor="avatar-upload">
                    <Button component="span" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                        Upload Profile
                    </Button>
                </label>
                {avatarPreview && (
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
        </div>
    );
};

export default AvatarUpload;
