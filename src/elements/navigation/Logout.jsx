import React from "react";
import './style_nav.scss';


export const Logout = ({logoutFunction}) => {

    const logout = (e) => {
        localStorage.removeItem('login');
        logoutFunction();
    }

    return <div className="logout" onClick={logout}>
        <div className="icon"></div>
        <h6>ВЫХОД</h6>
    </div>
}