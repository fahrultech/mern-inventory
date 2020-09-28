import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import _ from 'lodash'

const Datatables = ({ head, body, edit, hapus, columns, getP, sort }) => {
  const [key, setKey] = useState();
  const [pageData, setPageData] = useState({
    pageSum: 10,
    pageNumber: 1,
    nama: "",
  });
  const { newArr, totalPage } = body;
  
  const editItem = (data) => {
    setPageData({ ...pageData, pageNumber: data.selected + 1 });
  };
  useEffect(() => {
    getP(pageData)
  },[pageData])
  return (
    <Fragment>
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
                //onChange={(e) => selectOnChange(e)}
                className="form-control"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
            <div className="col-md-6 pull-right" style={{ padding: "0" }}>
              <input
                type="text"
                onChange={(e) => {
                  setKey(Math.random());
                  setPageData({
                    ...pageData,
                    pageNumber: 1,
                    nama: e.target.value,
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
                {columns.map((item, index) => (
                  <th key={index}>{item.label}</th>
                ))}
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {!_.isEmpty(body) ? 
                newArr.map((item, index) => (
                <tr key={index}>
                  {columns.map((key,index) =>(
                    <td key={index}>{item[key.name]}</td>
                  ))}
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => edit(item.id)}
                      className="btn btn-xs btn-warning"
                    >
                      <i className="mdi mdi-pencil"></i>
                    </button>
                    <> </>
                    <button
                      onClick={() => hapus(item.id)}
                      className="btn btn-xs btn-danger"
                    >
                      <i className="mdi mdi-delete"></i>
                    </button>
                  </td>
                </tr>
              ))
              :
              (<tr><td style={{ textAlign: 'center' }} colSpan={columns.length+1}>No Data Available</td></tr>)
            }
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ReactPaginate
            key={pageData.nama}
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
    </Fragment>
  );
};

export default Datatables;
