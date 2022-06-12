import React, { useRef } from "react";
import './style_nav.scss';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";



export const Nav = () => {
    const list = useRef(null);
    const dashboard = useRef(null);
    const today = useSelector(({ calendar_reducer }) => calendar_reducer.date);
    
    const underline = ({ target }) => {
        list.current.classList.remove('underline');
        dashboard.current.classList.remove('underline');
        target.classList.add('underline');
    }
    
    return <nav>
        <Link
            to={`/?date=${today}`}
            className="underline"
            onClick={underline}
            ref={list}
        >ежедневник</Link>
        <Link
            to="/dashboard"
            onClick={underline}
            ref={dashboard}
        >панель управления</Link>
    </nav>
}