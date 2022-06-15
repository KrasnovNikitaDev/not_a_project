import React from "react";
import './style_nav.scss';
import { useMediaQuery } from "react-responsive";


export const Logout = ({ logoutFunction }) => {
    const isSmallMonitor = useMediaQuery({ minWidth: 1300 });


    const logout = (e) => {
        localStorage.removeItem('login');
        logoutFunction();
    }

    return <div className="logout" onClick={logout}>
        <div className="icon"></div>
        { isSmallMonitor && <h5>ВЫХОД</h5> } 
    </div>
}