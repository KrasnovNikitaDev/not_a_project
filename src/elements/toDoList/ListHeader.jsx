import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './style_list.scss';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, Outlet, useOutletContext, useSearchParams } from "react-router-dom";
import { TaskForm } from './AddTask.jsx';


export const Header = () => {
    const [modal, setModal] = useState(false);
    const { pathname } = useLocation();

    const today = useSelector(({ calendar_reducer }) => calendar_reducer.date);

    const show_modal_add = () => setModal(state => !state);

    useEffect(
        () => {
            let links = document.querySelectorAll('.list_nav a');
            links.forEach(elem => {
                elem.classList.remove('active_link');
                if (elem.pathname === pathname) elem.classList.add('active_link');
            })
        }
    )

    return <>
        <header>
            <div className="list_nav">
                <Link to={`/?date=${today}`}>ЗАДАЧИ НА СЕГОДНЯ</Link>
                <Link to={`done?date=${today}`}>ВЫПОЛНЕННЫЕ НА СЕГОДНЯ</Link>
            </div>
            <div className="add" onClick={show_modal_add}>+</div>
        </header>
        
        {
            modal && ReactDOM.createPortal(
                <div className="modal_wrapper">
                    <TaskForm hide={show_modal_add} />
                </div>
                , document.querySelector('#modal'))
        }
    </>
}