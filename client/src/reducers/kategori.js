import { 
    GET_KATEGORIES,
    GET_KATEGORI, 
    KATEGORIES_ERROR, 
    ADD_KATEGORI_ERROR 
} from '../actions/types'

const initialState = {
    kategories: [],
    kategori: null,
    loading: true,
    totalPage: 0,
    error: {}
};

export default function(state = initialState, action){
    const { type, payload } = action

    switch(type){
        case GET_KATEGORIES:
            return {
                ...state,
                kategories: payload.kategori,
                totalPage : payload.totalPage,
                error: {},
                loading: false
            };
        case KATEGORIES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ADD_KATEGORI_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case GET_KATEGORI:
            return {
                ...state,
                kategori: payload,
                loading: false
            }
        default:
            return state
    }
}