import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './style_list.scss';
import { Link, useLocation, Outlet, useOutletContext, useSearchParams } from "react-router-dom";
import { ThemeContext } from "../../App.jsx";
import { Header } from './ListHeader.jsx';




export const ToDOList = () => {
    const theme = useContext(ThemeContext);
    const { list, user } = useSelector(store => store.user_reducer);
    const [searchParams] = useSearchParams();
    const param = searchParams.get('date');


    return <div className="list_wrapper">
        <div className={"list " + theme}>
            <Header />
            <Outlet context={[list, user, param]} />
        </div>

    </div>
}