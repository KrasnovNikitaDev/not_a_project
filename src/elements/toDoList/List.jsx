import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { USER } from '../../store/action.js';
import './style_list.scss';
import { Link, useLocation, Outlet, useOutletContext} from "react-router-dom";
import * as helpers from './functions.js';

const Task = ({ value }) => {
    return <div className="task">
        <div className="checkbox"></div>
        <div className="task_value">{value.value}</div>
        <div className="create_date">{value.date}</div>
    </div>
}

export const List = () => {
    const state = useOutletContext();
    
    return <>
        {
            state.map((elem, i) => <Task key={i} value={elem} />)
        }
    </>
}


const Header = () => {
    const today = useSelector(({calendar_reducer}) => calendar_reducer.date);

    return <header>
        <div className="list_nav">
            <div className="active_task _task"><Link to={`/?date=${today}`}>ЗАДАЧИ НА СЕГОДНЯ</Link></div>
            <div className="done_task _task"><Link to={`done?date=${today}`}>ВЫПОЛНЕННЫЕ НА СЕГОДНЯ</Link></div>
            <div className="all_task _task"><Link to={`all?date=${today}`}>ВСЕ ЗАДАЧИ</Link></div>
        </div>
        <div className="add">+</div>
    </header>
}




export const ToDOList = () => {
    const { tasks } = useSelector(store => store.user_reducer);
    const [state, setstate] = useState([]);
    const location = useLocation();


    useEffect(
        () => setstate(helpers.set_toDoList(location, tasks))
    , [tasks, location])



    return <div className='list_wrapper'>
        <div className="list">
            <Header />
            <Outlet context={state} />
        </div>

    </div>
}