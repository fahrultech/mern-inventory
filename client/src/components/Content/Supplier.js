import React, { Fragment, useEffect, useState } from 'react'
import Datatables from "../common/Datatables";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios'
import { Modal, Button } from "react-bootstrap";
import { errorStatus, errorMessage } from '../mixins/error';
import classnames from 'classnames';
import { openModal, closeModal, addSupplier, getSupplier, getSuppliers, updateSupplier, deleteSupplier } from '../../actions/supplier';

const Supplier = ({
    supplier,
    suppliers,
    error,
    open,
    getSuppliers,
    getSupplier,
    addSupplier,
    deleteSupplier,
    updateSupplier,
    openModal,
    closeModal
}) => {
    const [editStatus, setEditStatus] = useState(false);
    const [formData, setFormData] = useState({
        nama: '',
        alamat: '',
        notelepon: ''
    });
    const [pageData, setPageData] = useState({
        pageSum: 10,
        pageNumber: 1,
        namaSubkategori: "",
    });
    const resetForm = () => {
        setFormData({...formData, nama:'', alamat:'', notelepon:''})
    }
    const handleOpen = () => {
        resetForm()
        openModal()
    }
    const handleClose = () => {
        closeModal();
    }
    const submit = e => {
        e.preventDefault();
        if (!editStatus) {
            addSupplier(formData)
            return;
        }
        updateSupplier(formData);
    }

    useEffect(() => {
        getSuppliers(pageData)
    }, [])
    console.log(suppliers)
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    // Fungsi Wajib Bagi Data Tables
    const columns = [
        {
            label: "Nama Supplier",
            name: "nama",
        },
        {
            label: "No Telepon",
            name: "notelepon",
        },
    ];
    const editSupplier = async (id) => {
        setEditStatus(true)
        const res = await axios.get('/api/supplier/' + id);
        const { _id, nama, notelepon, alamat } = res.data
        setFormData({ ...formData, id: _id, nama, alamat, notelepon })
        openModal()
    };
    const hapusSupplier = (id) => {
        deleteSupplier(id)
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
                    <h4 className="page-title">Supplier</h4>
                </div>
            </div>
            <div className="page-content-wrapper ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <div className="panel panel-primary">
                                <div className="panel-body">
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={handleOpen}
                                    ><i className="fa fa-plus"></i> Tambah</button>
                                    <Datatables
                                        edit={editSupplier}
                                        hapus={hapusSupplier}
                                        getP={getData}
                                        columns={columns}
                                        body={suppliers}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Supplier</Modal.Title>
                </Modal.Header>
                <form className="form-horizontal" onSubmit={(e) => submit(e)}>
                    <Modal.Body>

                        <div className="form-group">
                            <label className="control-label col-md-3">Nama Supplier</label>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    className={classnames('form-control',{'parsley-error' : errorStatus(error,'nama')})}
                                    onChange={(e) => onChange(e)}
                                />
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error,'nama')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">Alamat</label>
                            <div className="col-md-8">
                                <textarea
                                    name="alamat"
                                    className={classnames('form-control', { 'parsley-error' : errorStatus(error,'alamat') })}
                                    value={formData.alamat}
                                    onChange={e => onChange(e)}
                                    cols="30"
                                    rows="4"
                                ></textarea>
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'alamat')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-3">No Telepon</label>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    name="notelepon"
                                    value={formData.notelepon}
                                    className={classnames('form-control',{ 'parsley-error' : errorStatus(error,'notelepon') })}
                                    onChange={(e) => onChange(e)}
                                />
                                {error.length > 0 && (
                                    <ul className="parsley-errors-list filled">
                                        <li className="parsley-required">{errorMessage(error, 'notelepon')}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>Close</Button>
                        <button type="submit" className="btn btn-sm btn-primary">
                            Simpan
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </Fragment>
    )
}

Supplier.propTypes = {
    open: PropTypes.bool
}

const mapStateToProps = state => ({
    supplier: state.supplier.supplier,
    suppliers: state.supplier.suppliers,
    error: state.supplier.error,
    open: state.supplier.open
})

export default connect(mapStateToProps, {
    getSupplier,
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    openModal,
    closeModal
})(Supplier)