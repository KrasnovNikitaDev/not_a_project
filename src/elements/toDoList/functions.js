

export const set_toDoList = ({pathname}, param, storeList) => {
    let list = storeList[param] || [];

    switch (pathname) {
        case "/":
            return list.task_list || [];
        case "/done":
            return list.done_task_list || [];
        default: return [];
    }
}


export const key_generator = () => {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let key = '';


    for (let i = 0; i < 15; i++) {
        let n = Math.round(Math.random() * arr.length)
        key += arr[n]
    }

    return key
}


export const task = (value) => {
    let obj = {
        key: key_generator(),
        value,
        done: false,
    };

    return obj;
}


export const check_task = (e, task) =>{
    return ({
        ...task,
        done: e.target.checked
    })
}