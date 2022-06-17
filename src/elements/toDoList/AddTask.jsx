import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './style_list.scss';
import { useSearchParams } from "react-router-dom";
import * as helpers from './functions.js';
import * as actions from '../../store/action.js'
import { useForm } from "react-hook-form";


export const TaskForm = ({ hide }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { list, user } = useSelector(store => store.user_reducer);
    const param = searchParams.get('date');



    const add = ({ task }) => {
        let taskObject = helpers.task(task);
        dispatch(actions.ADD_TASK(user, taskObject, param, list));

        hide();
    }

    const animeUnderline = ({ target }) => {
        target.nextSibling.classList.toggle('anime_line');
    }


    return <div className="form_block">
        <form onSubmit={handleSubmit(add)} autoComplete="off">
            <h3>Добавить задачу</h3>
            <div>
                <textarea type="text"
                    onFocus={animeUnderline}
                    placeholder="Введите задачу"
                    {
                    ...register("task",
                        {
                            required: 'Поле пустое, введите задачу.',
                            onBlur: (e) => animeUnderline(e),
                        }
                    )}></textarea>
                <span></span>
                <p>{errors.task && errors.task.message}</p>

            </div>
            <div className='buttons'>
                <button type='submit'>Добавить</button>
                <button id='exit' onClick={hide}>выход</button>

            </div>
        </form>
    </div>
}
