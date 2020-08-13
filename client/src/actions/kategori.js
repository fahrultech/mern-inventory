import axios from 'axios'
import {
    GET_KATEGORIES,
    GET_KATEGORI,
    KATEGORIES_ERROR,
    ADD_KATEGORI_ERROR
} from './types'

export const getKategories = (pageData) => async dispatch =>{
    try{
        const res = await axios.get("/api/kategori", {
            params: {
                pageSum : pageData.pageSum,
                pageNumber : pageData.pageNumber,
                namaKategori : pageData.namaKategori
            }
        })
        dispatch({
            type: GET_KATEGORIES,
            payload: res.data
        })
    }catch(err){
        // dispatch({
        //     type: KATEGORIES_ERROR,
        //     payload: { msg: err.response.statusText, status: err.response.status }
        // })
    }
}

export const addKategori = formData => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/kategori', formData, config);
        dispatch({
            type: GET_KATEGORIES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ADD_KATEGORI_ERROR,
            payload: err.response.data.errors
        })
    }
}

export const getKategori = id => async dispatch => {
    try {
        const res = await axios.get(`/api/kategori/${id}`)
        dispatch({
            type: GET_KATEGORI,
            payload : res.data
        })

    } catch (error) {
    }
}

export const deleteKategori = id => async dispatch =>{
    try {
        const res = await axios.delete(`/api/kategori/${id}`);

        dispatch({
            type: GET_KATEGORIES,
            payload: res.data
        })
    } catch (error) {
    }
}