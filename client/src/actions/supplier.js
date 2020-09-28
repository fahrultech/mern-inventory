import axios from 'axios'
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
} from './types';

export const openModal = () => async dispatch => {
    dispatch({
        type : OPEN_MODAL,
        payload : true
    })
}

export const closeModal = () => async dispatch => {
    dispatch({
        type : CLOSE_MODAL,
        payload : false
    })
}

export const addSupplier = (formData) => async dispatch => {
    try {
        const res = await axios.post('/api/supplier', formData)
        dispatch({
            type: GET_SUPPLIERS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ADD_SUPPLIER_ERROR,
            payload: error.response.data.errors
        })
    }
}

export const getAllSupplier = () => async dispatch =>{
    const res = await axios.get('/api/supplier/all');
    dispatch({
        type : GET_ALL_SUPPLIER,
        payload : res.data
    });
}

export const getSuppliers = (pageData) => async dispatch => {
    try {
        const { pageSum, pageNumber, nama } = pageData;
        const res = await axios.get('/api/supplier', {
            params: {
                pageSum,
                pageNumber,
                nama
            }
        })
        console.log(res.data);
        dispatch({
            type: GET_SUPPLIERS,
            payload: res.data
        })
    } catch (error) {

    }
}

export const getSupplier = id => async dispatch => {
    const res = await axios.get('/api/supplier/' + id);
    dispatch({
        type: GET_SUPPLIER,
        payload: res.data
    })
}

export const updateSupplier = (formData) => async dispatch => {
    try {
        const { id } = formData;
        const res = await axios.put('/api/supplier/' + id, formData);
        dispatch({
            type: GET_SUPPLIERS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SUPPLIER_ERROR,
            payload: error.response.data.errors
        })
    }
}

export const deleteSupplier = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/supplier/${id}`);
        dispatch({
            type : GET_SUPPLIERS,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type: DELETE_SUPPLIER_ERROR,
            payload: error.response.data.error
        })
    }
}

