import axios from 'axios';
import {
    GET_SUBKATEGORIES,
    GET_SUBKATEGORI,
    ADD_SUB_KATEGORI_ERROR,
    GET_ALL_SUBKATEGORIES,
    UPDATE_SUBKATEGORI_ERROR,
    DELETE_SUBKATEGORI_ERROR
} from './subkategori'

export const

export const store = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const res = await axios.post('/api/subkategori', formData, config);
        dispatch({
            type: GET_SUBKATEGORIES,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type: ADD_SUB_KATEGORI_ERROR,
            payload : error.response.data.errors
        })
    }
}

export const index = () => async dispatch => {
    try {
        const res = await axios.get('/api/subkategori/');
        dispatch({
            type: GET_SUBKATEGORIES,
            payload : res.data
        })
    } catch (error) {
       
    }
}

export const show = id => async dispatch => {
    try {
        const res = await axios.get('/api/subkategori/'+id);
        dispatch({
            type: GET_SUBKATEGORI,
            payload: res.data
        })
    } catch (error) {
        
    }
}

export const update = (formData, id) => async dispatch => {
    try {
        const res = await axios.put(`/api/subkategori/${id}`,formData);
        dispatch({
            type: GET_SUBKATEGORIES,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SUBKATEGORI_ERROR,
            payload : error.response.data.errors
        })
    }
}

export const destroy = id => async dispatch =>{
    try {
        const res = await axios.delete(`/api/subkategori/${id}`);
        dispatch({
            type: GET_SUBKATEGORIES,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type : DELETE_SUBKATEGORI_ERROR,
            payload : error.response.data.errors
        })
    }
}