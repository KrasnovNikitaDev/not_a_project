import axios from "axios";


export const SET_DATE = (value) => ({ type: "SET-DATE", data: value });
export const SET_MONTH = (value) => ({ type: "SET-MONTH", data: value });
export const SET_YEAR = (value) => ({ type: "SET-YEAR", data: value });

export const SET_DATE_PREV_MONTH = (value) => ({ type: "SET-DATE-PREV-MONTH", data: value });
export const SET_DATE_NEXT_MONTH = (value) => ({ type: "SET-DATE-NEXT-MONTH", data: value });

export const PREV_YEAR = { type: "PREV-YEAR" };
export const NEXT_YEAR = { type: "NEXT-YEAR" };
export const SET_TODAY = { type: "SET-TODAY" };



export const USER_GET_TASKS = ({name, mail}) => (dispatch) => {
    axios.get(`http://localhost:3000/tasks?user=${mail}`)
        .then(res => res.data[0])
        .then(({ list }) => {
            dispatch({
                type: "USER-GET-TASKS",
                user: { name: name, mail: mail },
                list: list
            })
        })
}


export const ADD_TASK = ({ mail }, task, param, list) => {
    axios.get(`http://localhost:3000/tasks?user=${mail}`)
        .then(res => res.data[0])
        .then(({ id, list }) => {
            if (list[param] === undefined) list[param] = { task_list: [], done_task_list: [] }

            list[param].task_list.push(task);

            axios.put(`http://localhost:3000/tasks/${id}`, {
                id,
                user: mail,
                list: {
                    ...list
                }
            })
        })

    if (list[param] === undefined) list[param] = { task_list: [], done_task_list: [] }

    return ({
        type: "ADD-TASK",
        key: param,
        value: {
            task_list: [...list[param].task_list, task],
            done_task_list: [...list[param].done_task_list],
        }
    })
}

export const LIST_REORDER = (param, state, { mail }, list) => {
    const { pathname } = window.location;

    handele_list_action(state, param, mail, 'reorder');

    return ({
        type: "REORDER_LIST",
        key: param,
        value: {
            task_list: pathname === '/' ? state : list[param].task_list,
            done_task_list: pathname === '/done' ? state : list[param].done_task_list,
        }
    })


}


export const LIST_TASK_CHECK = (task, param, { mail }) => {
    handele_list_action(task, param, mail, 'check')

    return ({ type: 'TASK-CHECK', task, param, })
}

export const LIST_TASK_REMOVE = (task, param, { mail }) => {
    handele_list_action(task, param, mail, 'remove');

    return ({ type: 'TASK-REMOVE', task, param })
}


function handele_list_action(target, param, mail, value) {
    const { pathname } = window.location;

    axios.get(`http://localhost:3000/tasks?user=${mail}`)
        .then(response => response.data[0])
        .then(({ id, list, user }) => {
            let data = list[param];
            let task_list;
            let done_task_list;

            switch (value) {
                case "remove": {
                    if (pathname === '/') {
                        task_list = data.task_list.filter(elem => elem.key !== target.key && elem);
                        done_task_list = data.done_task_list;
                    } else {
                        done_task_list = data.done_task_list.filter(elem => elem.key !== target.key && elem);
                        task_list = data.task_list;
                    }
                } break;
                case "check": {
                    if (pathname === '/') {
                        task_list = data.task_list.filter(elem => elem.key !== target.key && elem);
                        done_task_list = [...data.done_task_list, target];
                    } else {
                        done_task_list = data.done_task_list.filter(elem => elem.key === elem && elem);
                        task_list = [...data.task_list, target];
                    }
                }
                    break;
                case "reorder": {
                    if (pathname === '/') {
                        task_list = target;
                        done_task_list = data.done_task_list;
                    } else {
                        done_task_list = target;
                        task_list = data.task_list;
                    }
                }
                    break;
            }

            axios.put(`http://localhost:3000/tasks/${id}`,
                {
                    id,
                    user,
                    list: {
                        ...list,
                        [param]: {
                            task_list: task_list,
                            done_task_list: done_task_list,
                        }
                    }
                })
        })
}