import { 
    GET_KATEGORIES,
    GET_KATEGORI, 
    KATEGORIES_ERROR, 
    ADD_KATEGORI_ERROR 
} from '../actions/types'

import _ from 'lodash';

const initialState = {
    kategories: [],
    kategori: null,
    loading: true,
    totalPage: 0,
    error: {},
    open : false,
};

export default function(state = initialState, action){
    const { type, payload } = action

    switch(type){
        case GET_KATEGORIES:
            return {
                ...state,
                kategories: payload.kategori,
                totalPage: payload.totalPage,
                error: {},
                loading: false,
                open: false,
            };
        case 'GET_ALL_KATEGORIES':
            return {
                ...state,
                kategories : payload
            }
        case KATEGORIES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case 'ADD_KATEGORI':
            return {
                ...state,
                open: false
            }
        case 'DELETE_KATEGORI':
            return {
                ...state,
                kategories: payload
            }
        case ADD_KATEGORI_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                open : true
            }
        case GET_KATEGORI:
            return {
                ...state,
                kategori: payload,
                loading: false,
                open: true
            }
        case 'OPEN_MODAL':
            return {
                ...state,
                open: true
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                open: false
            }
        default:
            return state
    }
}