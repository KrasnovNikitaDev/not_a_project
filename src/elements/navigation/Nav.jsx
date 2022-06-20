import React, { useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";


export const Nav = () => {
    const today = useSelector(({ calendar_reducer }) => calendar_reducer.date);
    const isMobile = useMediaQuery({ maxWidth: 570 });
    const isSmallMonitor = useMediaQuery({ minWidth: 571, maxWidth: 1299 });
    const isFullHDMonitor = useMediaQuery({ minWidth: 1300 });
    const { pathname } = useLocation();
    const nav = useRef(null);

    useEffect(
        () => {
            let links = document.querySelectorAll('.navigation  a');;
            if(links.length !== 0) {
                links.forEach(elem => {
                    elem.classList.remove('active_link');
                    if (elem.pathname === pathname) elem.classList.add('active_link');
                })
                if(pathname === '/done') links[0].classList.add('active_link');
            }
            console.log('effect');
        }
    , [isFullHDMonitor, isSmallMonitor])

    return <>
        {
            isFullHDMonitor && <nav ref={nav}>
                <Link to={`/?date=${today}`}>ежедневник</Link>
                <Link to="/dashboard">панель управления</Link>
            </nav>
        }
        {
            isSmallMonitor && <nav ref={nav}>
                <Link className="todolist" to={`/?date=${today}`}></Link>
                <Link className="dashboard" to={`/dashboard`}></Link>
            </nav>
        }
        {
            isMobile && <>
                <Link className="todolist" to={`/?date=${today}`}></Link>
                <Link className="dashboard" to={`/dashboard`}></Link>
            </>

        }
    </>
}