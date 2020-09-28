import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Datatables from "../common/Datatables";
import { getProduct, getProducts, addProduct, updateProduct, deleteProduct, openModal, closeModal } from '../../actions/product';
import { getAllKategori } from '../../actions/kategori';
import { getSubkategoriByKategoriId } from '../../actions/subkategori';
import { getAllSupplier } from '../../actions/supplier';
import { Modal, Button } from "react-bootstrap";
import { errorStatus, errorMessage } from '../mixins/error';
import classnames from 'classnames';
import axios from 'axios'

const Product = (
    {
        product,
        products,
        error,
        open,
        addProduct,
        getProducts,
        deleteProduct,
        updateProduct,
        openModal,
        closeModal,
        // Kategori State
        getAllKategori,
        kategories,
        // Subkategori State
        getSubkategoriByKategoriId,
        subkategories,
        //Supplier
        getAllSupplier,
        suppliers
    }) => {

    const [formData, setFormData] = useState({
        id: "",
        kode: "",
        nama: "",
        kategori: "",
        subkategori: "",
        kemasan: "",
        supplier: "",
        berat: "",
        satuan: "",
        hargaBeli: "",
        hargaJual: "",
        stokToko: "",
        stokGudang: "",
        stokTotal: "",
        lokasiToko: "",
        lokasiGudang: ""

    });
    const { kode,
        nama,
        kategori,
        subkategori,
        kemasan,
        supplier,
        berat,
        satuan,
        hargaBeli,
        hargaJual,
        stokToko,
        stokGudang,
        stokTotal,
        lokasiToko,
        lokasiGudang } = formData;

    // State Block
    const [editStatus, setEditStatus] = useState(false);

    const [pageData, setPageData] = useState({
        pageSum: 10,
        pageNumber: 1,
        nama: "",
    });
    const [err, setErr] = useState({
        kode: false,
        nama: false
    })
    // End Of State Block

    // Effect Block
    useEffect(() => {
        getAllKategori();
    }, [])
    useEffect(() => {
        getProducts(pageData);
    }, []);
    useEffect(() => {
        getProducts(pageData);
    }, [pageData]);
    useEffect(() => {
        getAllSupplier()
    },[])
    // End Of Effect Block
    console.log(products);
    const handleClose = () => closeModal();
    const handleOpen = () => {
        setEditStatus(false);
        setFormData({
            ...formData,
            kode: "",
            nama: "",
            kategori: "",
            subkategori: "",
            kemasan: "",
            supplier: "",
            berat: "",
            satuan: "",
            hargaBeli: "",
            hargaJual: "",
            stokToko: "",
            stokGudang: "",
            stokTotal: "",
            lokasiToko: "",
            lokasiGudang: ""
        });
        openModal();
    };
    const onSelect = (e) => {
        if (e.target.name === 'kategori') {
            getSubkategoriByKategoriId(e.target.value)
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const submit = (e) => {
        e.preventDefault();
        if (!editStatus) {
            addProduct(formData)
            return;
        }
        updateProduct(formData, formData.idSubkategori);
    };
    const onChange = (e) => {
        if(e.target.name === 'stokToko' || e.target.name === 'stokGudang'){
            setFormData({...formData, stokTotal : stokToko + stokGudang})
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fungsi Wajib Bagi Data Tables
    const columns = [
        {
            label: "Kode Barang",
            name: "kode",
        },
        {
            label: "Nama Produk",
            name: "nama",
        },
        {
            label: "Kategori",
            name: "kategori",
        },
        {
            label: "Harga Jual",
            name: "harga",
        },
        {
            label: "Stok Toko",
            name: "stokToko",
        },
        {
            label: "Stok Gudang",
            name: "stokGudang",
        },
        {
            label: "Stok Total",
            name: "stokTotal",
        },
        {
            label: "Lokasi Toko",
            name: "lokasiToko",
        },
        {
            label: "Lokasi Gudang",
            name: "lokasiGudang",
        },
    ];
    const editProduct = async (id) => {
        setEditStatus(true)
        const res = await axios.get('/api/product/' + id);
        console.log(res.data);
        const { 
            _id, 
            kode,
            nama,
            kategori,
            subkategori,
            kemasan,
            satuan,
            supplier,
            berat,
            hargaBeli,
            hargaJual,
            stokToko,
            stokGudang,
            lokasiToko,
            lokasiGudang
         } = res.data
        setFormData({ ...formData, 
            id: _id, 
            kode,
            nama,
            kategori,
            subkategori,
            kemasan,
            satuan,
            supplier,
            berat,
            hargaBeli,
            hargaJual,
            stokToko,
            stokGudang,
            lokasiToko,
            lokasiGudang
        })
        getSubkategoriByKategoriId(kategori);
        openModal()
    };
    const hapusProduct = (id) => {
        if(window.confirm('Apakah data product ini akan dihapus?')){
            console.log(id);
            deleteProduct(id)
        }
        
    };
    const getData = (data) => {
        const { pageSum, pageNumber, nama } = data;
        setPageData({ ...pageData, pageSum, pageNumber, namaSubkategori: nama })
    }


    // End Funsgi Wajib
    return (
        <Fragment>
            <div className="">
                <div className="page-header-title">
                    <h4 className="page-title">Produk</h4>
                </div>
            </div>
            <div className="page-content-wrapper ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="panel panel-primary">
                                <div className="panel-body">
                                    <button
                                        style={{ marginBottom: "20px" }}
                                        className="btn btn-success btn-sm"
                                        onClick={handleOpen}
                                    >
                                        <i className="fa fa-plus-circle"></i> Tambah
                  </button>
                  <Datatables
                    edit={editProduct}
                    hapus={hapusProduct}
                    getP={getData}
                    columns={columns}
                    body={products}
                  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Produk</Modal.Title>
                </Modal.Header>
                <form className="form-horizontal">
                    <Modal.Body>
                        <div className="form-group">
                            <label className="control-label col-md-3">Kode Produk</label>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    name="kode"
                                    value={formData.kode}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'kode') })}
                                    onChange={(e) => onChange(e)}
                                />
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'kode')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Nama Produk</label>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'nama') })}
                                    onChange={(e) => onChange(e)}
                                />
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'nama')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">Kategori</label>
                            <div className="col-md-8">
                                <select
                                    value={formData.kategori}
                                    name="kategori"
                                    onChange={onSelect}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'kategori') })}
                                >
                                    <option value="0">-- Pilih Kategori --</option>
                                    {kategories !== 0
                                        ? kategories.map((item, index) => (
                                            <option key={index} value={item._id}>
                                                {item.namaKategori}
                                            </option>
                                        ))
                                        : ""}
                                </select>
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'kategori')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Subkategori</label>
                            <div className="col-md-8">
                                <select
                                    value={formData.subkategori}
                                    name="subkategori"
                                    onChange={onSelect}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'subkategori') })}
                                >
                                    <option value="0">-- Pilih Sub Kategori --</option>
                                    {subkategories !== 0
                                        ? subkategories.map((item, index) => (
                                            <option key={index} value={item._id}>
                                                {item.namaSubkategori}
                                            </option>
                                        ))
                                        : ""}
                                </select>
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'subkategori')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Kemasan</label>
                            <div className="col-md-8">
                                <select
                                    value={formData.kemasan}
                                    name="kemasan"
                                    onChange={onSelect}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'kemasan') })}
                                >
                                    <option value="">-- Pilih Kemasan --</option>
                                    <option value="dip">DIP</option>
                                    <option value="smd">SMD</option>
                                    <option value="roll">Roll</option>
                                    <option value="other">Other</option>
                                </select>
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'kemasan')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Satuan</label>
                            <div className="col-md-8">
                                <select
                                    value={formData.satuan}
                                    name="satuan"
                                    onChange={onSelect}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'kemasan') })}
                                >
                                    <option value="">-- Pilih Satuan --</option>
                                    <option value="pcs">pcs</option>
                                    <option value="mtr">mtr</option>
                                    <option value="other">Other</option>
                                </select>
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'kemasan')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Supplier</label>
                            <div className="col-md-8">
                                <select
                                    value={formData.supplier}
                                    name="supplier"
                                    onChange={onSelect}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'supplier') })}
                                >
                                    <option value="">-- Pilih Supplier --</option>
                                    {suppliers.length > 0 && suppliers.map((item,index) => (
                                        <option key={index} value={item._id}>{item.nama}</option>
                                    ))}
                                </select>
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'supplier')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Berat</label>
                            <div className="col-md-8">
                                <input
                                    value={formData.berat}
                                    name="berat"
                                    onChange={onChange}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'berat') })}
                                />
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'berat')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Harga Beli</label>
                            <div className="col-md-8">
                                <input
                                    value={formData.hargaBeli}
                                    name="hargaBeli"
                                    onChange={onChange}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'hargaBeli') })}
                                />
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'hargaBeli')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Harga Jual</label>
                            <div className="col-md-8">
                                <input
                                    value={formData.hargaJual}
                                    name="hargaJual"
                                    onChange={onChange}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'hargaJual') })}
                                />
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'hargaJual')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Stok Toko</label>
                            <div className="col-md-8">
                                <input
                                    value={formData.stokToko}
                                    name="stokToko"
                                    onChange={onChange}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'stokToko') })}
                                />
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'stokToko')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Stok Gudang</label>
                            <div className="col-md-8">
                                <input
                                    value={formData.stokGudang}
                                    name="stokGudang"
                                    onChange={onChange}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'stokGudang') })}
                                />
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'stokGudang')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Lokasi Toko</label>
                            <div className="col-md-8">
                                <input
                                    value={formData.lokasiToko}
                                    name="lokasiToko"
                                    onChange={onChange}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'lokasiToko') })}
                                />
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'lokasiToko')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Lokasi Gudang</label>
                            <div className="col-md-8">
                                <input
                                    value={formData.lokasiGudang}
                                    name="lokasiGudang"
                                    onChange={onChange}
                                    className={classnames('form-control', { 'parsley-error': errorStatus(error, 'lokasiGudang') })}
                                />
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'lokasiGudang')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>Close</Button>
                        <button onClick={e => submit(e)} className="btn btn-sm btn-primary">
                            Simpan
                            </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </Fragment >
    )
}

Product.propTypes = {
    product: PropTypes.object,
    products: PropTypes.object,
    error: PropTypes.array,
    open: PropTypes.bool,
    getProduct: PropTypes.func,
    getProducts: PropTypes.func,
    addProduct: PropTypes.func,
    updateProduct: PropTypes.func,
    deleteProduct: PropTypes.func,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    suppliers : PropTypes.array
}

const mapStateToProps = (state) => ({
    product: state.product.product,
    products: state.product.products,
    error: state.product.error,
    open: state.product.open,
    kategories: state.kategori.kategories,
    subkategories: state.subkategori.subkategoriesByCategory,
    suppliers : state.supplier.allsupplier
})

export default connect(mapStateToProps, {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    openModal,
    closeModal,
    getAllKategori,
    getAllSupplier,
    getSubkategoriByKategoriId
})(Product)