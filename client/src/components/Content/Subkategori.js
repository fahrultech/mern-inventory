import React, { Fragment, useEffect, useState } from "react";
import Datatables from "../common/Datatables";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllKategori } from '../../actions/kategori';
import _ from 'lodash'
import axios from "axios";

const Subkategori = ({ getAllKategori, kategories }) => {
  // State Block
  const [body, setBody] = useState([]);
  const [formData, setFormData] = useState({
    idSubkategori: "",
    namaSubkategori: "",
    kategori: "",
  });
  const [error, setError] = useState([]);
  const [open, setOpen] = useState(false);
  const { namaSubkategori, kategori } = formData;
  // End Of State Block

  // Effect Block
  useEffect(() => {
    getSubkategories()
  }, []);
  useEffect(() => {
    getAllKategori()
  },[])
  // End Of Effect Block
  
  const getSubkategories = async () => {
    const res = ((await axios.get("/api/subkategori")).data);
    setBody(body => [...body, res])
  };
  const columns = [
    {
      label: 'Nama Subkategori',
      name : 'namaSubkategori'
    },
    {
      label : 'Nama Kategori',
      name: 'namaKategori'
    }
  ]
  const handleClose = () => setOpen(false);
  const handleOpen = () =>{
    setOpen(true);
  };
  _.isObject(body[0]) ? console.log(body[0].newArr) : console.log('ni;')
  const onSelect = (e) => {
    setFormData({...formData, kategori:e.target.value})
  }
  console.log(body[0])
  const submit = (e) => {
    e.preventDefault();
    axios.post('/api/subkategori', formData).then(response => {
      getSubkategories();
    })
  };
  const onChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  };
  const fill = (id) => {
    console.log(id);
  };
  const jii = (id) => {
    console.log(id);
  };
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
                    edit={fill}
                    hapus={jii}
                    columns={columns}
                    body={_.isObject(body[0]) ? body[0].newArr : []}
                    head={["Nama Subkategori", "Nama Kategori"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={open} onHide={handleClose}>
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
                <select value={kategori} name="categoryId" onChange={onSelect} className="form-control">
                <option value="0">-- Pilih Kategori --</option>
                {kategories !== 0 ? kategories.map((item,index) => (
                  <option key={index} value={item._id}>{item.namaKategori}</option>
                )): ''}
                  
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
  getAllKategori:PropTypes.func,
  kategori:PropTypes.array
}

const mapStateToProps = state => ({
  kategories : state.kategori.kategories
})



export default connect(mapStateToProps, {getAllKategori})(Subkategori);
