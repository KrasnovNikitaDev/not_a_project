import React, { useEffect } from "react";
import './style_nav.scss'
import { User } from './User.jsx';
import { Nav } from "./Nav.jsx";
import { Logout } from './Logout.jsx'
import { USER } from "../../store/action.js";
import { useDispatch } from 'react-redux';

export const Navigation = ({ fn }) => {
    const dispatch = useDispatch();


    useEffect(
        () => {
            let user = localStorage.getItem('login');
            user && dispatch(USER(JSON.parse(user)));
        }
    , [])


    return <div className="navigation">
        <User />
        <Nav />
        <Logout logoutFunction={fn} />
    </div>
}