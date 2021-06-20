import Axios from 'axios';
import { CART_ITEM_QTY, PUR_ITEM_QTY } from '../constants/cartConstants';

export const SET_ARR = (arr) => async (dispatch) => {
    dispatch({
        type: CART_ITEM_QTY,
        payload: arr,
    });
    localStorage.setItem('qty', arr);
};
export const ARR_EL = (i) => (dispatch) => {
    dispatch({
        type: PUR_ITEM_QTY,
        payload: 0,
    });
    localStorage.setItem('qty', 0);
};