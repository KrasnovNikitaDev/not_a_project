import React from "react";
import * as helpers from "./helpers.js"
import { useForm } from "react-hook-form";
import * as helper from './helpers.js'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";


export const Signin = ({ setLogin, setLoginFunction }) => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const submite = (value) => {
        helper.auth_user(value, setLoginFunction, setError, dispatch);
        setSearchParams({ date: new Date().toLocaleDateString() })
    }

    const animeUnderline = ({ target }) => {
        target.nextSibling.classList.toggle('anime_line');
    }

    return <>
        <h3>РЕГИСТРАЦИЯ</h3>
        <form onSubmit={handleSubmit(submite)}>
            <div>
                <input
                    defaultValue="new user"
                    placeholder="Имя"
                    onFocus={animeUnderline}
                    {
                    ...register("name",
                        {
                            required: helpers.required('Введите имя'),
                            onBlur: (e) => animeUnderline(e),
                            maxLength: {
                                value: 20,
                                message: 'Имя слишком длинное.'
                            }
                        }
                    )}
                />
                <span></span>
                <p>{errors.name && errors.name.message}</p>
            </div>

            <div>
                <input
                    defaultValue="new_user@mail.com"
                    placeholder="почта"
                    onFocus={animeUnderline}
                    {
                    ...register("mail",
                        {
                            required: helpers.required('Введите почту'),
                            onBlur: (e) => animeUnderline(e),
                            maxLength: {
                                value: 20,
                                message: 'Почтка слишком длинная.'
                            }
                        }
                    )}
                />
                <span></span>
                <p>{errors.mail && errors.mail.message}</p>
            </div>

            <div>
                <input
                    defaultValue="password"
                    placeholder="пароль"
                    onFocus={animeUnderline}
                    {
                    ...register("password",
                        {
                            required: helpers.required('Введите пароль'),
                            onBlur: (e) => animeUnderline(e),
                            maxLength: {
                                value: 20,
                                message: 'Пароль слишком длинный'
                            }
                        }
                    )}
                />
                <span></span>
                <p>{errors.password && errors.password.message}</p>
            </div>

            <div className="form_buttons">
                <h6 onClick={setLogin}>Авторизация</h6>
                <button type="submite">РЕГИСТРАЦИЯ</button>
            </div>

        </form>
    </>
}




