import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './style_list.scss';
import { Link, useLocation, Outlet, useOutletContext, useSearchParams } from "react-router-dom";
import * as helpers from './functions.js';
import * as actions from '../../store/action.js'
import { useForm } from "react-hook-form";


export const TaskForm = ({ hide }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { list, user } = useSelector(store => store.user_reducer);
    const param = searchParams.get('date');



    const add = ({task}) => {
        let taskObject = helpers.task(task);
        dispatch(actions.ADD_TASK(user, taskObject, param, list));

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
