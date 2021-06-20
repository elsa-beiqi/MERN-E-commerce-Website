import { CART_ITEM_QTY, PUR_ITEM_QTY } from '../constants/cartConstants';

export const cartReducer = (
    state = { qty: 0 },
    action
) => {
    switch (action.type) {
        case CART_ITEM_QTY:
            return { qty: action.payload }
        case PUR_ITEM_QTY:
            return { qty: 0 }
        default:
            return state;
    }
};
