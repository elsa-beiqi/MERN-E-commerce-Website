import Axios from 'axios';
import {
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
} from '../constants/userConstants';

export const signin = (email, password) => async (dispatch) => {

    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        console.log("HIII")
        const { data } = await Axios.post(`/login`, { email: email, password: password }, { withCredentials: true });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: true });
        localStorage.setItem('userInfo', "in");
        localStorage.setItem('userType', data.userInfo.userType);
        localStorage.setItem('username', data.userInfo.fullname);
        localStorage.setItem('useremail', data.userInfo.email);
        localStorage.setItem('useraddress', data.userInfo.address);
        localStorage.setItem('usercity', data.userInfo.city);
        localStorage.setItem('usercountry', data.userInfo.country);
        console.log(data.userInfo.userType);
        console.log(data);
        console.log(data.userInfo.fullname)
    } catch (error) {
        alert(error.response.data);
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response.data
        });
    }
};
export const signout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userType');
    localStorage.removeItem('qty');
    localStorage.removeItem('username');
    localStorage.removeItem('useremail');
    localStorage.removeItem('useraddress');
    localStorage.removeItem('usercity');
    localStorage.removeItem('usercountry');
    await Axios.post(`/logout`, { withCredentials: true });
    dispatch({ type: USER_SIGNOUT });
};