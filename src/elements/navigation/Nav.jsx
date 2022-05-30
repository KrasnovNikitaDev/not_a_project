import React from "react";
import './style_nav.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";



export const Nav = () => {
    const today = useSelector(({calendar_reducer}) => calendar_reducer.date);

    return <nav>
        <Link to={`/?date=${today}`}>
            <h5>TO DO LIST</h5>
        </Link>
        <Link to="/dashboard">
            <h5>DASHBOARD</h5>
        </Link>
    </nav>
}