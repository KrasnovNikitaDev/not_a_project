import React, { useContext, useEffect } from "react";
import './style_nav.scss';
import { User } from './User.jsx';
import { Nav } from "./Nav.jsx";
import { Logout } from './Logout.jsx'
import { USER_GET_TASKS } from "../../store/action.js";
import { useDispatch } from 'react-redux';
import { ThemeContext } from "../../App.jsx";
import { useMediaQuery } from "react-responsive";
import { WeatherComponent } from "../weather/WeatherComponent.jsx";


export const Navigation = ({ fn, children }) => {
    const dispatch = useDispatch();
    const theme = useContext(ThemeContext);
    const addWeatherComponent = useMediaQuery({maxWidth: 700});

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
        {children}
        {
            addWeatherComponent && <>
                <hr/>
                <WeatherComponent />
                <hr />
            </>
        }
        <Logout logoutFunction={fn} />
    </div>

}
