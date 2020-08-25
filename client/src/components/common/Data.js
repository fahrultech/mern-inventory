import React, { Fragment, useState, useEffect } from "react";

const Data = ({nama}) => {
    console.log(nama)
    return (
        <div>
            { nama.map((item, index) => (
                <p key={index}>{item}</p>
            ))
            }
        </div>
    )
}

export default Data;