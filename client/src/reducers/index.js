import { combineReducers } from 'redux';
import kategori from './kategori';
import subkategori from './subkategori';
import product from './product';
import supplier from './supplier'

export default combineReducers({
    kategori,
    subkategori,
    product,
    supplier
})