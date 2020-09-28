import {
    GET_PRODUCT,
    GET_PRODUCTS, ADD_PRODUCT_ERROR, 
    UPDATE_PRODUCT_ERROR, 
    DELETE_PRODUCT_ERROR,
    OPEN_MODAL,
    CLOSE_MODAL
} from './types';
import axios from 'axios';

export const openModal = () => dispatch => {
    dispatch({
        type: OPEN_MODAL,
        payload : true
    })
}

export const closeModal = () => dispatch => {
    dispatch({
        type: CLOSE_MODAL,
        payload : true
    })
}

export const getProducts = (pageData) => async dispatch => {
    try {
        const res = await axios.get('/api/product', {
            params: {
                pageSum: pageData.pageSum,
                pageNumber: pageData.pageNumber,
                nama: pageData.nama
            }
        });
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        })
    } catch (error) {

    }
}

export const getProduct = id => async dispatch => {
    try {
        const res = await axios.get(`/api/product/${id}`);
        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        })
    } catch (error) {

    }
}

export const addProduct = (formData) => async dispatch => {
    try {
        const res = await axios.post(`/api/product/`, formData);
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_ERROR,
            payload: error.response.data.errors
        })
    }
}

export const updateProduct = formData => async dispatch => {
    try {
        const { id } = formData;
        const res = await axios.put(`/api/product/${id}`, formData);

        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_ERROR,
            payload: error
        })
    }
}

export const deleteProduct = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/product/${id}`);

        dispatch({
            type : GET_PRODUCTS,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type : DELETE_PRODUCT_ERROR,
            payload : error
        })
    }
}