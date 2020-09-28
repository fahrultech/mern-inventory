import axios from 'axios';
import {
    GET_SUBKATEGORIES,
    GET_SUBKATEGORI,
    ADD_SUBKATEGORI_ERROR,
    GET_ALL_SUBKATEGORIES,
    UPDATE_SUBKATEGORI_ERROR,
    DELETE_SUBKATEGORI_ERROR,
    OPEN_MODAL,
    CLOSE_MODAL,
    GET_SUBKATEGORIES_BY_CATEGORY
} from './types'

export const open = () => dispatch => {
    dispatch({
        type: OPEN_MODAL,
        payload : true
    })
}

export const close = () => dispatch => {
    dispatch({
        type: CLOSE_MODAL,
        payload: false
    })
}

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
            type: ADD_SUBKATEGORI_ERROR,
            payload : error.response.data.errors
        })
    }
}

export const getAllSubkategori = (pageData) => async dispatch => {
    try {
        const res = await axios.get('/api/subkategori/',{
            params: {
                pageSum : pageData.pageSum,
                pageNumber : pageData.pageNumber,
                namaSubkategori : pageData.namaSubkategori
            }
        });
       
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
        console.log(res.data)
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

export const getSubkategoriByKategoriId = id => async dispatch => {
    try {
        const res = await axios.get(`api/subkategori/getbykategori/${id}`);
        console.log(res.data)
        dispatch({
            type : GET_SUBKATEGORIES_BY_CATEGORY,
            payload : res.data
        })
    } catch (error) {
    }
    
    

}