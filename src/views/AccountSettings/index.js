import { Grid, Tab, Tabs, Box } from '@mui/material';
import { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import AvatarUpload from './AvatarUpload';
import EditDetails from './EditDetails';
import Password from './Password';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

// ==============================|| Account Settings ||============================== //

const AccountSettings = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <MainCard>
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
                <Tab
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ marginRight: '4px' }} />
                            Profile
                        </Box>
                    }
                    sx={{ textTransform: 'none' }}
                />
                <Tab
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LockIcon sx={{ marginRight: '4px' }} />
                            Password
                        </Box>
                    }
                    sx={{ textTransform: 'none' }}
                />
            </Tabs>
            {activeTab === 0 && (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <SubCard title="Profile Picture">
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <AvatarUpload />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={8}>
                        <SubCard title="Edit Account Details">
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <EditDetails />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            )}
            {activeTab === 1 && (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12} lg={12}>
                        <SubCard title="Change Password">
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Password />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            )}
        </MainCard>
    );
};

export default AccountSettings;
