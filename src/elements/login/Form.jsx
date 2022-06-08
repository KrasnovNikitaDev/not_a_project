import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Login } from "./Login.jsx";
import './style_form.scss';
import { Signin } from './Signin.jsx';
import * as helper from './helpers.js'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";



const Buttons = ({ login, changeState }) => {
    const setForm = () => changeState();

    return <div className="form_buttons">
        {login ? <h6 onClick={setForm}>Регистрация</h6> : <h6 onClick={setForm}>Аторизация</h6>}
        {login ? <button type="submit">ВХОД</button> : <button type="submit">РЕГИСТРАЦИЯ</button>}
    </div>


}


export const Form = ({ setLoginFunction }) => {
    const [state, setstate] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const methods = useForm();
    const dispatch = useDispatch();

    const submit = (value) => {
        if (state) {
            helper.logIn_user(value, setLoginFunction, methods, dispatch);
            setSearchParams({date: new Date().toLocaleDateString()})
        }
        else helper.auth_user(value, setLoginFunction, methods, dispatch);
    }

    const changeState = () => setstate(() => !state)


    return <div className="form_block">
        <FormProvider {...methods}>
            <form autoComplete="off" onSubmit={methods.handleSubmit(submit)}>
                {state ?
                    <Login /> :
                    <Signin />
                }
                <Buttons
                    login={state}
                    changeState={changeState}
                />
            </form>
        </FormProvider>
    </div>
}