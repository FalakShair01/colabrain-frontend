import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

//-----------------------|| AUTH GUARD ||-----------------------//

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const account = useSelector((state) => state.account);
    const { isLoggedIn } = account;
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            // Use navigate to redirect to the "/login" route
            navigate('/login');
        }
    }, [!isLoggedIn, navigate]);

    return !isLoggedIn ? null : children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
