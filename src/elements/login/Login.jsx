import React from "react";
import * as helpers from "./helpers.js"
import { useForm } from "react-hook-form";
import * as helper from './helpers.js'
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";




export const Login = ({ setSignIn, setLoginFunction }) => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const submite = (value) => {
        helper.logIn_user(value, setLoginFunction, setError, dispatch);
        setSearchParams({ date: new Date().toLocaleDateString() })
    }

    const animeUnderline = ({target}) => {
        target.nextSibling.classList.toggle('anime_line');
    }

    return <>
        <h3>АВТОРИЗАЦИЯ</h3>
        <form onSubmit={handleSubmit(submite)} autoComplete="off">
            <div>
                <input
                    onFocus={animeUnderline}
                    defaultValue="user@mail.com"
                    placeholder="почта"
                    {
                    ...register("mail",
                        {
                            required: helpers.required('Введите почту'),
                            onBlur: (e) => animeUnderline(e), 
                        }
                    )}
                />
                <span></span>
                <p>{!errors.mail ?  " " : errors.mail.message}</p>
            </div>

            <div>
                <input
                    onFocus={animeUnderline}
                    defaultValue="123"
                    placeholder="пароль"
                    {
                    ...register("password",
                        {
                            required: helpers.required('Введите пароль'),
                            onBlur: (e) => animeUnderline(e), 
                        }
                    )}
                />
                <span></span>
                <p>{!errors.password ? " " : errors.password.message}</p>
            </div>


            <div className="form_buttons">
                <h6 onClick={setSignIn}>Регистрация</h6>
                <button type="submite">ВХОД</button>
            </div>
        </form>
    </>
}


