import {
  GET_SUBKATEGORIES,
  GET_SUBKATEGORI,
  ADD_SUBKATEGORI_ERROR,
  UPDATE_SUBKATEGORI_ERROR,
  GET_ALL_SUBKATEGORIES,
  DELETE_SUBKATEGORI_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL
} from "../actions/types";

const initialState = {
    subkategori:{},
    subkategories:{},
    error:[],
    loading:false,
    modal:false
}

export default function(state = initialState, action){
    const { payload, type } = action;

    switch(type){
        case OPEN_MODAL:
            return {
                ...state,
                modal: payload
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modal : payload
            }
        case GET_SUBKATEGORIES:
            return {
                ...state,
                subkategories: payload,
                modal : false
            }
        case GET_SUBKATEGORIES:
            return {
                ...state,
                subkategori : payload,
                modal : true
            }
        case ADD_SUBKATEGORI_ERROR:
            return {
                ...state,
                error: payload,
                modal : false
            }
        case UPDATE_SUBKATEGORI_ERROR:
            return {
                ...state,
                error: payload,
                modal:false
            }
        default:
            return state
    }
}
