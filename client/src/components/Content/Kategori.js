
import React, { Fragment, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Modal, Button, Pagination } from "react-bootstrap";
import { getKategories,addKategori,deleteKategori, getKategori } from '../../actions/kategori'

const Kategori = ({ deleteKategori,addKategori,getKategories,getKategori, kategori : { kategories, error, kategori, totalPage } }) => {
  const [pageData, setPageData] = useState({
    pageSum : 10,
    pageNumber : 1,
    namaKategori: ""
  })
  useEffect(() => {
      getKategories(pageData)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[getKategories])
  useEffect(() => {
    addPagination()
  },[pageData])
  useEffect(() => {
    getKategories(pageData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData])
  const [formData, setFormData] = useState({
    namaKategori: "",
  });
  console.log(pageData)
  const [active, setActive] = useState(1);
  const addPagination = () => {
    let items = [];
    for(let number =1; number <= Math.ceil(totalPage / pageData.pageSum); number++){
        console.log('Penambahan');
      items.push(<Pagination.Item key={number} onClick={()=>hi(number)} active={number === active}>{number}</Pagination.Item>)
    }
    return items
  }
  let { namaKategori } = formData;
  const [open, setOpen] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const hi = (num) => {
    setPageData({...pageData, pageNumber: num})
    setActive(num)
  }
  const handleOpen = () => {
    error.length = 0;
    setFormData({...formData, namaKategori: ""})
    setOpen(true);
  };
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const selectOnChange = e => {
    setPageData({...pageData, pageSum: parseInt(e.target.value)})
  }
  const submit = async (e) => {
    e.preventDefault();
    await addKategori(formData);
    setSubmited(true)
  }
  const editKategori =  async (id) => {
    setEdit(true)
    await getKategori(id)
    setOpen(true)
  }
  const hapusKategori = async (id) => {
    deleteKategori(id);
  }
  open && submited && error.length === undefined && setOpen(false)
  useEffect(() => {
    kategori !== null && setFormData({...formData,namaKategori: kategori.namaKategori})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[kategori])
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
                      <div className="col-md-12" style={{padding:"0",margin:"0", marginBottom:"10px"}}>
                        <div className="col-md-2 pull-left" style={{marginLeft:"0", padding:"0"}}>
                          <select onChange={(e) => selectOnChange(e)} className="form-control">
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                          </select>
                        </div>
                        <div className="col-md-6 pull-right" style={{padding:"0"}}>
                          <input type="text" onChange={(e) => {setPageData({...pageData,namaKategori: e.target.value})}} name="cariNamaKategori" className="form-control" />
                        </div>
                      </div>
                      <table
                        id="tabelQuotation"
                        className="table table-striped table-bordered table-condensed"
                      >
                        <thead>
                          <tr>
                            <th>Nama Kategori</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                            {kategories.map((item,index) => (
                                <tr key={index}>
                                    <td>{item.namaKategori}</td>
                                    <td style={{textAlign:"center"}}>
                                      <button onClick={() => editKategori(item._id)} className="btn btn-xs btn-warning"><i className="mdi mdi-pencil"></i></button>
                                      <> </>
                                      <button onClick={()=>hapusKategori(item._id)} className="btn btn-xs btn-danger"><i className="mdi mdi-delete"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="paginate pull-right">
                            <Pagination bsSize="medium">{addPagination()}</Pagination>
                      </div>
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
          <form className="form-horizontal" onSubmit={e => submit(e)}>
            <div className="form-group">
              <label className="control-label col-md-3">Nama Kategori</label>
              <div className="col-md-8">
                <input
                  type="text"
                  name="namaKategori"
                  value={namaKategori}
                  className="form-control"
                  onChange={e => onChange(e)}
                />
                {error.length > 0 && (<ul className="parsley-errors-list filled">
                    <li className="parsley-required">{error[0].msg}</li>
                </ul>)}
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
}

const mapStateToProps = state => ({
    kategori: state.kategori,
})

export default connect(mapStateToProps, { getKategories, addKategori, deleteKategori, getKategori })(Kategori);
