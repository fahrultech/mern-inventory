import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import {
  getKategories,
  addKategori,
  deleteKategori,
  getKategori,
  openModal,
  closeModal,
  updateKategori,
} from "../../actions/kategori";

const Kategori = ({
  deleteKategori,
  addKategori,
  getKategories,
  getKategori,
  openModal,
  closeModal,
  updateKategori,
  kategori: { kategories, error, kategori, open, totalPage },
}) => {
  const [pageData, setPageData] = useState({
    pageSum: 10,
    pageNumber: 1,
    namaKategori: "",
  });
  const [formData, setFormData] = useState({
    idKategori: "",
    namaKategori: "",
  });
  const [order,setOrder] = useState(1);
  const [key, setKey] = useState(1);
  useEffect(() => {
    document.querySelectorAll('table thead tr th').forEach((item, index) => {
      item.addEventListener('click', () => {
        sortingTable(index)
      })
    })
  })
  useEffect(() => {
    getKategories(pageData);
  }, [getKategories]);
  useEffect(() => {
    getKategories(pageData)
  }, [pageData]);
  const [edit, setEdit] = useState(false);
  const handleClose = () => {
    closeModal();
  };
  const sortingTable = (id) =>{
    setOrder(!setOrder)
    console.log(order)
  }
  const handleOpen = () => {
    setFormData({ ...formData, namaKategori: "", idKategori: "" });
    openModal();
  };
  const editItem = (data) => {
    setPageData({...pageData,pageNumber:data.selected+1})
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, pageNumber:"1" });
  };
  const selectOnChange = e => {
    setPageData({...pageData, pageSum: parseInt(e.target.value)})
  }
  const submit = (e) => {
    e.preventDefault();
    if (edit === true) {
      updateKategori(formData);
      getKategories(pageData)
      setEdit(false)
      return;
    }
    addKategori(formData);
  };
  const editKategori = async (id) => {
    setEdit(true);
    await getKategori(id);
  };
  const hapusKategori = async (id) => {
    deleteKategori(id);
  };
  const [ini, setIni] = useState(0);
  useEffect(() => {
    kategori !== null &&
      setFormData({
        ...formData,
        namaKategori: kategori.namaKategori,
        idKategori: kategori._id,
      });
  }, [kategori]);
  return (
    <Fragment>
      <div className="">
        <div className="page-header-title">
          <h4 className="page-title">Kategori</h4>
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
                    <i className="fa fa-plus-circle"></i> Kategori
                  </button>
                  <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div
                        className="col-md-12"
                        style={{
                          padding: "0",
                          margin: "0",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          className="col-md-2 pull-left"
                          style={{ marginLeft: "0", padding: "0" }}
                        >
                          <select
                            onChange={(e) => selectOnChange(e)}
                            className="form-control"
                          >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                          </select>
                        </div>
                        <div
                          className="col-md-6 pull-right"
                          style={{ padding: "0" }}
                        >
                          <input
                            type="text"
                            onChange={(e) => {
                              setKey(Math.random())
                              setPageData({
                                ...pageData,
                                namaKategori: e.target.value,
                              });
                            }}
                            name="cariNamaKategori"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <table
                        id="tabelQuotation"
                        className="table table-striped table-bordered table-condensed"
                      >
                        <thead>
                          <tr>
                          <th className="sorting_desc"><a style={{ color:"#ffffff" }} href="javascript:void(0)"><i className="fa fa-fw fa-sort"></i></a>Nama Kategori</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {kategories.map((item, index) => (
                            <tr key={index}>
                              <td>{item.namaKategori}</td>
                              <td style={{ textAlign: "center" }}>
                                <button
                                  onClick={() => editKategori(item._id)}
                                  className="btn btn-xs btn-warning"
                                >
                                  <i className="mdi mdi-pencil"></i>
                                </button>
                                <> </>
                                <button
                                  onClick={() => hapusKategori(item._id)}
                                  className="btn btn-xs btn-danger"
                                >
                                  <i className="mdi mdi-delete"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <ReactPaginate
                        key={key}
                        pageCount={totalPage}
                        containerClassName="pagination"
                        pageClassName="paginate_button"
                        activeClassName="active"
                        onPageChange={editItem}
                        pageRangeDisplayed={4}
                        marginPagesDisplayed={1}
                        initialPage={0}
                      />
                    </div>
                  </div>
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
              <label className="control-label col-md-3">Nama Kategori</label>
              <div className="col-md-8">
                <input
                  type="text"
                  name="namaKategori"
                  value={formData.namaKategori}
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

Kategori.propTypes = {
  getKategories: PropTypes.func.isRequired,
  getKategori: PropTypes.func.isRequired,
  addKategori: PropTypes.func.isRequired,
  deleteKategori: PropTypes.func.isRequired,
  kategori: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  kategori: state.kategori,
});

export default connect(mapStateToProps, {
  getKategories,
  addKategori,
  deleteKategori,
  getKategori,
  openModal,
  closeModal,
  updateKategori,
})(Kategori);
