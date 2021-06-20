import axios from 'axios';
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

export const listProducts = (id, type, cat) => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    try {
        const fecthData = async () => {
            const { data } = await axios.get(`/product/${id}/${type}`, { withCredentials: true });
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
        };
        const fecthData1 = async () => {
            if (typeof (cat) === "undefined") {
                const { data } = await axios.get(`/product/filter?order=${type}`, { withCredentials: true });
                dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
            }
            else {
                const { data } = await axios.get(`/product/filter?categories=${cat}&order=${type}`, { withCredentials: true });
                dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
            }
        };
        const fecthData2 = async () => {
            const { data } = await axios.get(`/product/all`, { withCredentials: true });
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
        };
        if (typeof (type) === "undefined") { fecthData2(); } else if (id === "filter") { fecthData1(); } else { fecthData(); };
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};