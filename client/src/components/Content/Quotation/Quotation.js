import React, { Fragment } from 'react'

const Quotation = () => {
    return(
        <Fragment>
            <div className="">
                <div className="page-header-title">
                    <h4 className="page-title">Quotation</h4>
                </div>
            </div>
            <div class="page-content-wrapper ">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                        <div class="panel panel-primary">
                            <div class="panel-body">
                            <form class="form-horizontal">
                                <div class="form-group">
                                <label for="noquotation" class="control-label col-md-2">No Quotation</label>
                                <div class="col-md-4">
                                    <input type="text" name="noquotation" class="form-control" readonly />
                                </div>
                                </div>
                                <div class="form-group">
                                <label for="tanggal" class="control-label col-md-2">Tanggal</label>
                                <div class="col-md-4">
                                    <input type="text" id="tanggal" name="tanggal" class="form-control" />
                                </div>
                                </div>
                                <div class="form-group">
                                <label for="namapelanggan" class="control-label col-md-2">Nama Pelanggan</label>
                                <div class="col-md-4">
                                    <div class="input-group">
                                    <input type="text" name="namapelanggan" class="form-control" />
                                    <span class="input-group-addon pelanggan"><i class="fa fa-user"></i></span>
                                    </div>
                                    <input type="hidden" name="kodepelanggan" class="form-control" />
                                    <input type="hidden" name="kodekecamatan" />
                                </div>
                                </div>
                            </form>
                            <table style={{marginTop:"20px",marginLeft:"-5px"}} id="tabellistquotation" class="table table-bordered table-striped table-condensed">
                                    <thead>
                                    <tr>
                                        <th style={{width:"12%"}}>Kode Barang</th>
                                        <th style={{width:"38%"}}>Nama Barang</th>
                                        <th style={{width:"10%"}}>Jumlah</th>
                                        <th style={{width:"12%"}}>Harga</th>
                                        <th style={{width:"12%"}}>Diskon</th>
                                        <th style={{width:"12%"}}>Subtotal</th>
                                        <th style={{width:"4%"}}>Aksi</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                            </table>
                            <div class="pull-left tombol">
                                <button class="btn btn-md btn-success btnquo-simpan"><i class="fa fa-save"></i> Simpan</button>
                                <button class="btn btn-md btn-danger btnquo-hapus"><i class="fa fa-times-circle"></i> Hapus</button>
                            </div>
                            <div class="form-horizontal pull-right">
                                <div class="form-group">
                                <label for="quotationsubtotal" class="control-label col-md-4">Sub Total</label>
                                <div class="col-md-8">
                                    <input type="text" name="quotationsubtotal" class="form-control" />
                                </div>
                                </div>
                                <div class="form-group">
                                <label for="quotationdiskonnota" class="control-label col-md-4">Diskon Nota</label>
                                <div class="col-md-8">
                                    <input type="text" name="quotationdiskonnota" class="form-control" />
                                </div>
                                </div>
                                <div class="form-group">
                                <label for="quotationkurir" class="control-label col-md-4">Kurir</label>
                                <div class="col-md-8 kurir">
                                    <input type="text" class="form-control" name="kurirquotation" />
                                </div>
                                </div>
                                <div class="form-group">
                                <label for="quotationongkir" class="control-label col-md-4">Ongkir</label>
                                <div class="col-md-8">
                                    <input type="text" name="quotationongkir" class="form-control" />
                                </div>
                                </div>
                                <div class="form-group">
                                <label for="quotationgrandtotal" class="control-label col-md-4">Grand Total</label>
                                <div class="col-md-8">
                                    <input type="text" name="quotationgrandtotal" class="form-control" />
                                </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Quotation