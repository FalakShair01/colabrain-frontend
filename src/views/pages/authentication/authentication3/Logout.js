import configData from 'config';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { LOGOUT } from './../../../../store/actions';

const Logout = async () => {
    const account = useSelector((state) => state.account);
    const dispatcher = useDispatch();
    await axios
        .post(configData.API_SERVER + 'logout/', { refresh: `${account.token.refresh}` })
        .then(function () {
            dispatcher({ type: LOGOUT });
            window.location.reload();
        })
        .catch(function (error) {
            console.log('error - ', error);
        });
};

export default Logout;
