import React, { useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";


export const Nav = () => {
    const today = useSelector(({ calendar_reducer }) => calendar_reducer.date);
    const isSmallMonitor = useMediaQuery({ maxWidth: 1299 });
    const isFullHDMonitor = useMediaQuery({ minWidth: 1300 });
    const { pathname } = useLocation();

   

    useEffect(
        () => {
            let links = document.querySelectorAll('nav a');
            links.forEach(elem => {
                elem.classList.remove('active_link');
                if (elem.pathname === pathname) elem.classList.add('active_link');
            })
            if(pathname === '/done') links[0].classList.add('active_link');
        }
    )

    return <nav>
        {
            isSmallMonitor && <>
                <Link className="todolist" to={`/?date=${today}`}></Link>
                <Link className="dashboard" to={`/dashboard`}></Link>
            </>
        }
        {
            isFullHDMonitor && <>
                <Link  to={`/?date=${today}`}>ежедневник</Link>
                <Link  to="/dashboard">панель управления</Link>
            </>
        }
    </nav>
}