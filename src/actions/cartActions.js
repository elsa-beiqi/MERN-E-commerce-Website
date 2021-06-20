import Axios from 'axios';
import { CART_ITEM_QTY, PUR_ITEM_QTY } from '../constants/cartConstants';

export const getCartQTY = () => async (dispatch) => {
    const { data } = await Axios.get(`/cart`, { withCredentials: true });
    dispatch({
        type: CART_ITEM_QTY,
        payload: data.length,
    });
    localStorage.setItem('qty', data.length);
};
export const purItems = () => (dispatch) => {
    dispatch({
        type: PUR_ITEM_QTY,
        payload: 0,
    });
    localStorage.setItem('qty', 0);
};