import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/action.js'
import { useLocation, useSearchParams } from "react-router-dom";


export const Eddit = ({ task, hideModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const param = searchParams.get('date');
    const { list, user } = useSelector(store => store.user_reducer);
    const { pathname } = useLocation();


    const eddit = ({ eddit }) => {
        let eddit_task = {
            ...task,
            value: eddit,
        }
        dispatch(actions.EDDIT_TASK(user, eddit_task, param, list, pathname))

    }

    const exit = () => hideModal();

    return <div className='eddit_task_area'>
        <form onSubmit={handleSubmit(eddit)}>
            <textarea
                cols="30"
                rows="10"
                defaultValue={task.value}
                {
                ...register("eddit",
                    {
                        required: 'Нельза оставлять пустое поле.'
                    })
                }></textarea>
            <p>{errors.eddit && errors.eddit.message}</p>
            <div>
                <button type='submite'>ИЗМЕНИТЬ</button>
                <button onClick={exit}>ВЫХОД</button>
            </div>
        </form>
    </div>
}