import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const index = () => {
    return(
        <Fragment>
            <Link to="/quotation/form" class="btn btn-sm btn-success">Form</Link>
            <h1>Quotation</h1>
        </Fragment>
    )
}

export default index