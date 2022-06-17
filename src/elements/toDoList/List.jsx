import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux";
import { Reorder } from "framer-motion"
import './style_list.scss';
import {  useLocation, useOutletContext } from "react-router-dom";
import * as helpers from './functions.js';
import * as actions from '../../store/action.js'
import { Eddit } from './EdditTask.jsx';



const Task = ({elem, task, user, param}) => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(true);
   
    const check = (e) => {
        let result = helpers.check_task(e, task);
        dispatch(actions.LIST_TASK_CHECK(result, param, user))
    }

    const del = () => {
        dispatch(actions.LIST_TASK_REMOVE(task, param, user))
    }

    const eddit = () => setModal((modal) => !modal);

    return <>
        <Reorder.Item value={task} elem={elem} key={elem.key} className="task">
            <input type="checkbox" checked={task.done} name="" id="" onChange={check} />
            <p>{task.value}</p>
            <div className='eddit_task' onClick={eddit}></div>
            <div className='delete_task' onClick={del}></div>
        </Reorder.Item>


        {
            modal && ReactDOM.createPortal(
                <div className="modal_wrapper_eddit_form">
                    <Eddit task={task} hideModal={eddit}/>
                </div>
                , document.querySelector('#modal'))
        }
    </>
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
                    <Task 
                        key={elem.key} 
                        elem={elem} 
                        task={elem} 
                        user={user} 
                        param={param} 
                    />
                ))
            }
        </Reorder.Group>
    </main>
}