import React from "react";
import { useFormContext } from "react-hook-form";
import * as helpers from "./helpers.js"


export const ErrorInputField = () => {
    return <p>ERROR</p>
}


export const Login = () => {
    const { register, formState: { errors }  } = useFormContext();

    return <>
        <h3>Авторизация</h3>
        <input
            defaultValue="user@mail.com"
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
            defaultValue="123"
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