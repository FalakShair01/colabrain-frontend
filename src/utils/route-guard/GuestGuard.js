import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { useEffect } from 'react';

//-----------------------|| GUEST GUARD ||-----------------------//

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */
const GuestGuard = ({ children }) => {
    const account = useSelector((state) => state.account);
    const { isLoggedIn } = account;
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            navigate(config.defaultPath);
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? null : children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
