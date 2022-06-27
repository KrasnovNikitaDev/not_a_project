import React, { useRef } from "react";
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export const Nav = () => {
    const date = useSelector((state) => state.calendar_reducer.date)
    const isMobile = useMediaQuery({ maxWidth: 570 });
    const isSmallMonitor = useMediaQuery({ minWidth: 571, maxWidth: 1299 });
    const isFullHDMonitor = useMediaQuery({ minWidth: 1300 });
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const param = searchParams.get('date');

    const today = param || date; 

    useEffect(
        () => {
            let links = document.querySelectorAll('.navigation  a');
            if (links.length !== 0) {

                links.forEach(elem => {
                    elem.classList.remove('active_link');
                    if (elem.pathname === pathname) elem.classList.add('active_link');
                })
            }
        }
    , [pathname, isFullHDMonitor, isSmallMonitor, isMobile])


    return <>
        {
            isFullHDMonitor && <nav>
                <Link to={`/?date=${today}`}>ежедневник</Link>
                <Link to="/dashboard?page=1">таблица</Link>
            </nav>
        }
        {
            isSmallMonitor && <nav>
                <Link className="todolist" to={`/?date=${today}`}></Link>
                <Link className="dashboard" to={`/dashboard?page=1`}></Link>
            </nav>
        }
        {
            isMobile && <>
                <Link className="todolist" to={`/?date=${today}`}></Link>
                <Link className="dashboard" to={`/dashboard?page=1`}></Link>
            </>

        }
    </>
}