import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/action.js'
import { useLocation, useSearchParams } from "react-router-dom";


export const Eddit = ({ task, hideModal }) => {
    const { register, handleSubmit, formState: { errors }, setFocus } = useForm();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const param = searchParams.get('date');
    const { list, user } = useSelector(store => store.user_reducer);
    const { pathname } = useLocation();

    useEffect(
        () => {
            setFocus("eddit")
            hideModal && document.addEventListener('keydown', ({key}) => {
            key === 'Escape' && hideModal();
        })}
    , [hideModal])


    const eddit = ({ eddit }) => {
        let eddit_task = {
            ...task,
            value: eddit,
        }
        dispatch(actions.EDDIT_TASK(user, eddit_task, param, list, pathname));
        hideModal();
    }

    const animeUnderline = ({ target }) => {
        target.nextSibling.classList.toggle('anime_line');
    }

    const exit = e => console.log(exit);
 
    return <div className='form_block'>
        <form onSubmit={handleSubmit(eddit)} autoComplete="off">
            <h3>Изменить задачу</h3>
            <div>
                <input
                    onFocus={animeUnderline}
                    defaultValue={task.value}
                    {
                    ...register("eddit",
                        {
                            required: 'Нельза оставлять пустое поле.',
                            onBlur: (e) => animeUnderline(e),
                        })
                    }/>
                <span></span>
                <p>{errors.eddit && errors.eddit.message}</p>
            </div>
            <div className='buttons'>
                <button type='submit'>Добавить</button>
                <button id='exit' onClick={hideModal}>выход</button>

            </div>
        </form>
    </div>
}