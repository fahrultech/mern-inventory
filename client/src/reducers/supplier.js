import {
    GET_SUPPLIER,
    GET_SUPPLIERS,
    GET_ALL_SUPPLIER,
    ADD_SUPPLIER,
    ADD_SUPPLIER_ERROR,
    UPDATE_SUPPLIER_ERROR,
    DELETE_SUPPLIER_ERROR,
    OPEN_MODAL,
    CLOSE_MODAL
} from '../actions/types';

const initialState = {
    allsupplier:[],
    supplier:{},
    suppliers:{},
    open: false,
    error:[]
}

export default function(state=initialState, action){
    const { type, payload } = action;

    switch(type){
        case GET_SUPPLIERS:
            return {
                ...state,
                suppliers : payload,
                error : [],
                open : false
            }
        case GET_SUPPLIER:
            return {
                ...state,
                supplier : payload,
                open : true,
                error : []
            }
        case GET_ALL_SUPPLIER:{
            return {
                ...state,
                allsupplier: payload
            }
        }
        case ADD_SUPPLIER_ERROR:
            return {
                ...state,
                error : payload,
                open : true
            }
        case UPDATE_SUPPLIER_ERROR:
            return {
                ...state,
                error : payload,
                open : true
            }
        case DELETE_SUPPLIER_ERROR:
            return {
                ...state,
                error : payload,
                open : false
            }
        case OPEN_MODAL:
            return {
                ...state,
                open : payload
            }
        case CLOSE_MODAL:
            return {
                ...state,
                open : payload
            }
        default :
            return state
    }
}