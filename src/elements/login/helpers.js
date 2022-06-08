import axios from 'axios';
import { USER_GET_TASKS } from "../../store/action.js";


export const required = (msg) => ({
    value: true,
    message: msg
})



export const logIn_user = (value, fn, methods, dispatch) => {
    axios({
        method: "get",
        url: `http://localhost:3000/users?mail=${value.mail}`
    })
        .then(response => {
            if (response.data[0] === undefined) {
                methods.setError('mail', { type: 'custom', message: 'Почта указана не верно' });
            } else return response.data[0];
        })
        .then(user => {
            if (user.password === value.password) {
                localStorage.setItem('login', JSON.stringify({ name: user.name, mail: user.mail }));
                dispatch(USER_GET_TASKS(user))
                fn();
            } else {
                methods.setError('password', { type: 'custom', message: 'пароль не верный' })
            }
        })
}



export const auth_user = (value, fn, methods, dispatch) => {
    axios({
        method: "get",
        url: `http://localhost:3000/users?mail=${value.mail}`
    })
        .then(response => response.data[0])
        .then(user => {
            if (user === undefined) add_user_to_db(value, fn);
            else methods.setError('mail', { type: 'custom', message: 'Пользователь с такой почтой уже зарегистрирован' })
        })
}

function add_user_to_db(user, fn, dispatch) {
    axios({
        method: 'post',
        url: `http://localhost:3000/users`,
        data: {
            name: user.name,
            mail: user.mail,
            password: user.password,
        }
    })
        .then(response => {
            localStorage.setItem('login', JSON.stringify({ name: user.name, mail: user.mail }));
            dispatch(USER_GET_TASKS(response))
            fn();
        })
}