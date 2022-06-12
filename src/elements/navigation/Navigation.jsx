import React, { useContext, useEffect } from "react";
import './style_nav.scss'
import { User } from './User.jsx';
import { Nav } from "./Nav.jsx";
import { Logout } from './Logout.jsx'
import { USER_GET_TASKS } from "../../store/action.js";
import { useDispatch } from 'react-redux';
import { ThemeContext } from "../../App.jsx";



export const Navigation = ({ fn, children }) => {
    const dispatch = useDispatch();
    const theme = useContext(ThemeContext)


    useEffect(
        () => {
            let user = localStorage.getItem('login');
            user && dispatch(USER_GET_TASKS(JSON.parse(user)));
        }
    , [])


    return <div className={"navigation " + theme}>
        <User />
        <hr />
        <Nav />
        <hr />
        { children}
        <Logout logoutFunction={fn} />
    </div>
}