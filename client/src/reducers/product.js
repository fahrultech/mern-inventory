import {
    GET_PRODUCT,
    GET_PRODUCTS, ADD_PRODUCT_ERROR,
    UPDATE_PRODUCT_ERROR,
    DELETE_PRODUCT_ERROR,
    OPEN_MODAL,
    CLOSE_MODAL
} from '../actions/types';

const initialState = {
    product: {},
    products: {},
    error: [],
    open: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
                open: false
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
                open: true
            }
        case ADD_PRODUCT_ERROR:
            return {
                ...state,
                error : payload,
                open : true
            }
        case UPDATE_PRODUCT_ERROR:
            return {
                ...state,
                error : payload,
                open : false
            }
        case OPEN_MODAL:
            return {
                ...state,
                open: true
            }
        case CLOSE_MODAL:
            return {
                ...state,
                open: false
            }
        default:
            return state;
    }

}