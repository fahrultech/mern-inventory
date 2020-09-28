import React, { Fragment, useEffect, useState } from "react";
import Datatables from "../common/Datatables";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllKategori } from "../../actions/kategori";
import { store, show, getAllSubkategori, update, destroy, open, close } from "../../actions/subkategori";
import _ from "lodash";
import axios from "axios";

const Subkategori = ({ 
  getAllKategori, 
  kategories, 
  show,
  index,
  update,
  store,
  destroy,
  subkategories,
  subkategori,
  error,
  modal,
  open,
  close
}) => {
  // State Block
  const [formData, setFormData] = useState({
    idSubkategori: "",
    namaSubkategori: "",
    kategori: "",
  });
  const { namaSubkategori, kategori } = formData;
  const [editStatus, setEditStatus] = useState(false);
  // End Of State Block
  const [pageData, setPageData] = useState({
    pageSum: 10,
    pageNumber: 1,
    namaSubkategori: "",
  });
  // Effect Block
  useEffect(() => {
    index(pageData);
  }, [index]);
  useEffect(() => {
    index(pageData);
  }, [pageData]);
  useEffect(() => {
    getAllKategori();
  }, []);
  // End Of Effect Block
  
  const handleClose = () => close();
  const handleOpen = () => {
    setEditStatus(false);
    setFormData({...formData, idSubkategori:'',namaSubkategori:'',kategori:'' })
    open()
  };
  const onSelect = (e) => {
    setFormData({ ...formData, kategori: e.target.value });
  };
  const submit = (e) => {
    console.log(formData)
    e.preventDefault();
    if(!editStatus){
      store(formData)
      return;
    }
    console.log('dol')
    update(formData, formData.idSubkategori);
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Fungsi Wajib Bagi Data Tables
  const columns = [
    {
      label: "Nama Subkategori",
      name: "namaSubkategori",
    },
    {
      label: "Nama Kategori",
      name: "namaKategori",
    },
  ];
  const editSubkategori = async (id) => {
    setEditStatus(true)
    const res = await axios.get('/api/subkategori/'+id);
    const {_id, namaSubkategori, kategori} = res.data
    setFormData({...formData, idSubkategori:_id, namaSubkategori, kategori})
    open()
  };
  const hapusSubkategori = (id) => {
    destroy(id)
  };
  const getData = (data) =>{
    const { pageSum, pageNumber, nama } = data;
    setPageData({...pageData, pageSum, pageNumber, namaSubkategori:nama})
  }
  // End Funsgi Wajib
  return (
    <Fragment>
      <div className="">
        <div className="page-header-title">
          <h4 className="page-title">Subkategori</h4>
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
                    edit={editSubkategori}
                    hapus={hapusSubkategori}
                    getP={getData}
                    columns={columns}
                    body={subkategories}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kategori</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal" onSubmit={(e) => submit(e)}>
            <div className="form-group">
              <label className="control-label col-md-3">Nama Subkategori</label>
              <div className="col-md-8">
                <input
                  type="text"
                  name="namaSubkategori"
                  value={formData.namaSubkategori}
                  className="form-control"
                  onChange={(e) => onChange(e)}
                />
                {error.length > 0 && (
                  <ul className="parsley-errors-list filled">
                    <li className="parsley-required">{error[0].msg}</li>
                  </ul>
                )}
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-md-3">Kategori</label>
              <div className="col-md-8">
                <select
                  value={kategori}
                  name="categoryId"
                  onChange={onSelect}
                  className="form-control"
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
                    <li className="parsley-required">{error[0].msg}</li>
                  </ul>
                )}
              </div>
            </div>
            <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
              <button type="submit" className="btn btn-sm btn-primary">
                Simpan
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

Subkategori.propTypes = {
  getAllKategori: PropTypes.func,
  kategori: PropTypes.array,
  index : PropTypes.func,
  show : PropTypes.func,
  store : PropTypes.func,
  update : PropTypes.func,
  destroy : PropTypes.func,
  open : PropTypes.func,
  close : PropTypes.func,
  modal : PropTypes.bool,
  subkategories : PropTypes.object,
  subkategori : PropTypes.object,
  error : PropTypes.array
};

const mapStateToProps = (state) => ({
  kategories: state.kategori.kategories,
  subkategories: state.subkategori.subkategories,
  subkategori: state.subkategori.subkategori,
  error: state.subkategori.error,
  modal: state.subkategori.modal,
});

export default connect(mapStateToProps, {
  getAllKategori,
  index:getAllSubkategori,
  show,
  store,
  update,
  destroy,
  open,
  close
})(Subkategori);
