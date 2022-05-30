import React from "react";
import { useFormContext } from "react-hook-form";
import * as helpers from "./helpers.js";




export const Signin = () => {
    const { register, formState: { errors } } = useFormContext();

    return <>
        <h3>Регистрация</h3>
        <input
            placeholder="ИМЯ"
            {
            ...register("name",
                {
                    required: helpers.required('Введите имя'),
                    pattern: /[A-Za-z]/,
                }
            )}
        />
        <p>{errors.name && errors.name.message}</p>

        <input
            defaultValue="nik@mial.ru"
            placeholder="почта"
            {
            ...register("mail",
                {
                    required: helpers.required('Введите почту'),
                }
            )}
        />
        <p>{errors.mail && errors.mail.message}</p>
        
        <input
            defaultValue="1232"
            placeholder="пароль"
            {
            ...register("password",
                {
                    required: helpers.required('Введите пароль'),
                }
            )}
        />
        <p>{errors.password && errors.password.message}</p>
    </>
}