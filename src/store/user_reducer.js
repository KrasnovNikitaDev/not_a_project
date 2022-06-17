


const user_state = {
    user: {
        name: '',
        mail: ''
    },
    list: {}
}

export function user_reducer(state = user_state, action) {
    switch (action.type) {
        case "USER-GET-TASKS": return {
            user: action.user,
            list: {
                ...action.list
            },
        };
        case "ADD-TASK": return {
            ...state,
            list: {
                ...state.list,
                [action.property]: action.value
            },
        };
        case "EDDIT-TASK": return {
            ...state,
            list: {
                ...state.list,
                [action.property]: action.value
            },
        };
        case "REORDER_LIST": return {
            ...state,
            list: {
                ...state.list,
                [action.key]: action.value,
            }
        }
        case "TASK-CHECK": return (
            task_action(state, action.param, action.task, "check")
        )
        case "TASK-REMOVE": return (
            task_action(state, action.param, action.task, "remove")
        )
        default: return state;
    }
}


function task_action(state, param, target, value) {
    const list = state.list[param];
    const { pathname } = window.location;
    let undone;
    let done;

    switch (value) {
        case "remove": {
            if (pathname === "/") {
                undone = list.task_list.filter(elem => elem.key !== target.key && elem);
                done = list.done_task_list;
            } else {
                done = list.done_task_list.filter(elem => elem.key !== target.key && elem);
                undone = list.task_list;
            }

            if (done.length === 0 && undone.length === 0) {
                delete state.list[param];

                return ({
                    ...state,
                    list: {
                        ...state.list,
                    }
                })
            }
        }
            break;
        case "check": {
            if (pathname === "/") {
                undone = list.task_list.filter(elem => elem.key !== target.key && elem);
                done = [...list.done_task_list, target];
            } else {
                done = list.done_task_list.filter(elem => elem.key !== target.key && elem);
                undone = [...list.task_list, target]
            }
        }
            break;
    }


    return ({
        ...state,
        list: {
            ...state.list,
            [param]: {
                task_list: undone,
                done_task_list: done,
            }
        }
    })
}