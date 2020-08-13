import React from "react";
import { Link } from 'react-router-dom';

const SidebarNoSub = (props) => {
    return (
        <li>
            <Link to={props.link} className="waves-effect">
            <i className={props.icon}></i>
            <span>
                {" "}
                {props.name}{" "}
                {/* <span className="badge badge-primary pull-right">1</span> */}
            </span>
            </Link>
        </li>
    )
}
const SidebarWithSub = (props) => {
    return(
        <li className="has_sub">
            <a href="/#" className="waves-effect">
                <i className={props.icon}></i> <span> {props.name} </span>{" "}
                <span className="pull-right">
                    <i className="mdi mdi-plus"></i>
                </span>
            </a>
                <ul className={`list-unstyled`}>
                {props.listSub.map((item, index) => (
                    <li key={index}>
                        <Link to={item.linkTo}>{item.name}</Link>
                    </li>
                ))}
                </ul>

        </li>
    )
}

export {SidebarNoSub, SidebarWithSub};