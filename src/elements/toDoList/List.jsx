import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux";
import { Reorder } from "framer-motion"
import './style_list.scss';
import { Link, useLocation, Outlet, useOutletContext, useSearchParams } from "react-router-dom";
import * as helpers from './functions.js';
import * as actions from '../../store/action.js'
import { useForm } from "react-hook-form";
import { ThemeContext } from "../../App.jsx";
import { useRef } from 'react';


const TaskForm = ({ hide }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { list, user } = useSelector(store => store.user_reducer);
    const param = searchParams.get('date');



    const add = (data) => {
        let task = helpers.task(data.task);
        dispatch(actions.ADD_TASK(user, task, param, list));

        hide();
    }

    return <div className="add_task_area">
        <form onSubmit={handleSubmit(add)}>
            <input type="text"
                {
                ...register("task",
                    {
                        required: 'Введите задачу.'
                    }
                )} />

            <p>{errors.task && errors.task.message}</p>

            <button type='sumbit'>Добавить</button>

            {errors.task && <button >выход</button>}

        </form>
    </div>
}


const Task = ({ elem, task, user, param }) => {
    const dispatch = useDispatch();

    const check = (e) => {
        let result = helpers.check_task(e, task);
        dispatch(actions.LIST_TASK_CHECK(result, param, user))
    }

    const del = () => {
        dispatch(actions.LIST_TASK_REMOVE(task, param, user))
    }

    return <Reorder.Item value={elem} key={elem.key} className="task">
        <input type="checkbox" checked={task.done} name="" id="" onChange={check} />
        <p>{task.value}</p>
        <div className='eddit_task' ></div>
        <div className='delete_task' onClick={del}></div>
    </Reorder.Item>
}


export const List = () => {
    const [list, user, param] = useOutletContext();
    const [state, setstate] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(
        () => setstate(() => helpers.set_toDoList(location, param, list))
        , [list, location])

    const x = (e) => {
        let target = e.target.tagName;
        if (target === "LI" || target === "P") {
            dispatch(actions.LIST_REORDER(param, state, user, list))
        }
    }

    return <main>
        <Reorder.Group axis='y' values={state} onReorder={setstate} onMouseUp={x}>
            {
                state.map((elem) => (
                    <Task key={elem.key} elem={elem} task={elem} user={user} param={param} />
                ))
            }
        </Reorder.Group>
    </main>
}


const Header = () => {
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