


const user_state = {
    user: {
        name: '',
        mail: ''
    },
    tasks: []
}

export function user_reducer(state = user_state, action) {
    switch (action.type) {
        case "USER": return { 
            ...state, 
            user: action.user, 
            tasks: action.list 
        };
        default: return state;
    }
}


