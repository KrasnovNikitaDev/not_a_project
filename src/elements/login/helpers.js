import axios from 'axios';
import { USER_GET_TASKS } from "../../store/action.js";


export const required = (msg) => ({
    value: true,
    message: msg
})



export const logIn_user = ({ mail, password }, fn, setError, dispatch) => {
    axios({
        method: "get",
        url: `http://localhost:3000/users?mail=${mail}`
    })
        .then(response => {
            if (response.data[0] === undefined) {
                setError('mail', { type: 'custom', message: 'Почта указана не верно' });
            } else return response.data[0];
        })
        .then(user => {
            if (user.password === password) {
                localStorage.setItem('login', JSON.stringify({ name: user.name, mail: user.mail }));

                dispatch(USER_GET_TASKS(user));

                fn();
            } else {
                setError('password', { type: 'custom', message: 'пароль не верный' })
            }
        })
}



export const auth_user = (value, fn, setError, dispatch) => {
    axios({
        method: "get",
        url: `http://localhost:3000/users?mail=${value.mail}`
    })
        .then(response => response.data[0])
        .then(user => {
            if (user === undefined) add_user_to_db(value, fn, dispatch);
            else setError('mail', { type: 'custom', message: 'Пользователь с такой почтой уже зарегистрирован' })
        })
}

function add_user_to_db({ mail, name, password }, fn, dispatch) {
    axios({
        method: 'post',
        url: `http://localhost:3000/users`,
        data: {
            name: name,
            mail: mail,
            password: password,
        }
    })
        .then(response => {
            localStorage.setItem('login', JSON.stringify({ name: name, mail: mail }));
            
            fn();
            
            return response.data
        })

        .then(({ id, name, mail }) => {
            axios.post(`http://localhost:3000/tasks`, {
                id,
                user: mail,
                list: {}
            })

            dispatch(USER_GET_TASKS({name, mail}))
        })
}