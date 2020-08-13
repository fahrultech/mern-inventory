import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Content/Dashboard'
import Produk from '../Content/Produk'
import Kategori from '../Content/Kategori'
import Subkategori from '../Content/Subkategori'
import Quotation from '../Content/Quotation/index'
import Invoice from '../Content/Invoice'
import Supplier from '../Content/Supplier'
import QuotationForm from '../Content/Quotation/Quotation'


const Content = () => {
    return (
        <div className="content-page">
            <div className="content">
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/produk" component={Produk}/>
                    <Route exact path="/kategori" component={Kategori}/>
                    <Route exact path="/subkategori" component={Subkategori}/>
                    <Route exact path="/quotation" component={Quotation}/>
                    <Route exact path="/invoice" component={Invoice}/>
                    <Route exact path="/supplier" component={Supplier}/>
                    <Route exact path="/quotation/form" component={QuotationForm}/>
                </Switch>
            </div>
            <footer className="footer">
                © {new Date().getFullYear()} SFE Electronics - All Rights Reserved.
            </footer>
        </div>
    )
}

export default Content;