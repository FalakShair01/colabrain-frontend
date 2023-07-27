import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import configData from '../../../../config';

// Material-UI components and icons
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Third-party components
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

const FirebaseRegister = ({ ...others }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const handleSubmitForm = async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            const requestData = {
                user: {
                    username: values.username,
                    email: values.email,
                    password: values.password
                },
                company_name: values.companyName,
                phone: values.phone
            };

            const response = await axios.post(configData.API_SERVER + 'register/', requestData);

            console.log('API response:', response.data);

            setStatus({ success: true });

            // Registration successful, redirect to the login page
            navigate('/login');
        } catch (err) {
            console.error(err);
            setStatus({ success: false });

            if (err.response && err.response.data && err.response.data.errors) {
                const apiErrors = err.response.data.errors;
                const formErrors = {};
                Object.keys(apiErrors).forEach((field) => {
                    formErrors[field] = apiErrors[field][0];
                });
                setErrors(formErrors);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* ... Your JSX content here ... */}

            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    companyName: '',
                    phone: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().required('Username is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    companyName: Yup.string().required('Company Name is required'),
                    phone: Yup.string().required('Phone is required')
                })}
                onSubmit={handleSubmitForm}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{ ...theme.typography.customInput }}
                                    fullWidth
                                    label="Username"
                                    margin="normal"
                                    name="username"
                                    type="text"
                                    value={values.username}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.username && errors.username)}
                                    helperText={touched.username && errors.username}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{ ...theme.typography.customInput }}
                                    fullWidth
                                    label="Company Name"
                                    margin="normal"
                                    name="companyName"
                                    type="text"
                                    value={values.companyName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.companyName && errors.companyName)}
                                    helperText={touched.companyName && errors.companyName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ ...theme.typography.customInput }}
                                    fullWidth
                                    label="Email Address"
                                    margin="normal"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-register"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        label="Password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        error={Boolean(touched.password && errors.password)}
                                    />
                                    {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ ...theme.typography.customInput }}
                                    fullWidth
                                    label="Phone"
                                    margin="normal"
                                    name="phone"
                                    type="text"
                                    value={values.phone}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.phone && errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                />
                            </Grid>
                        </Grid>

                        {errors.submit && (
                            <Box mt={3}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box mt={2}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
