import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { productListReducer, } from './reducers/productReducers';

import { userSigninReducer } from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo:
            localStorage.getItem('userInfo')
                ? localStorage.getItem('userInfo')
                : null,
        userType:
            localStorage.getItem('userType')
                ? localStorage.getItem('userType')
                : "1",
        username: localStorage.getItem('username')
            ? localStorage.getItem('username')
            : null,
        useremail: localStorage.getItem('useremail')
            ? localStorage.getItem('useremail')
            : null,
        useraddress: localStorage.getItem('useraddress')
            ? localStorage.getItem('useraddress')
            : null,
        usercity: localStorage.getItem('usercity')
            ? localStorage.getItem('usercity')
            : null,
        usercountry: localStorage.getItem('usercountry')
            ? localStorage.getItem('usercountry')
            : null,
    },
    cart: {
        qty: localStorage.getItem('qty')
            ? JSON.parse(localStorage.getItem('qty'))
            : 0,
    },
    refund: {
        discount: localStorage.getItem('discount')
            ? JSON.parse(localStorage.getItem('discount'))
            : [],
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;