
export const render_table = ([key, value]) => {
    let obj = {}

    obj.property = key;
    obj.all_tasks = value.done_task_list.length + value.task_list.length;
    obj.task = value.task_list.length;
    obj.done = value.done_task_list.length;

    return obj;
}



export const custom_sort = (arg, list) => {
    let [key, value] = arg;

    for (let i = 0; i < list.length; i++) {
        for (let n = 1; n < list.length; n++) {
            let [a, b] =
                key === 'date' && if_date(list, n) || 
                key === 'tasks' && if_tasks(list, n) ||
                key === 'done' && if_task_done( list, n) ||
                key === 'not-done' && if_task_not_done( list, n);

            if (value === 'up') {
                if (a < b) {
                    [list[n - 1], list[n]] = [list[n], list[n - 1]]
                }

            } else {
                if (a > b) {
                    [list[n - 1], list[n]] = [list[n], list[n - 1]]
                }
            }
        }
    }

    return list;
}



const if_date = ( list, n) => {
    let [a] = list[n - 1];
    let [b] = list[n]

    return[a, b]
}

const if_tasks = ( list, n) => {
    let a = list[n - 1][1].done_task_list.length + list[n - 1][1].task_list.length
    let b = list[n][1].done_task_list.length + list[n][1].task_list.length

    
    return [a, b];
}

const if_task_done = ( list, n) => {
    let a = list[n - 1][1].done_task_list.length 
    let b = list[n][1].done_task_list.length
    
    return [a, b];
}

const if_task_not_done = ( list, n) => {
    let a = list[n - 1][1].task_list.length 
    let b = list[n][1].task_list.length
    
    return [a, b];
}

export const pagination = (list, num, pagNumber = 1) => {

    let arr = Object.entries(list);
    let end = num * pagNumber
    let start = end - num


    return arr.slice(start, end)
}

export const pag_length = (list, n) => {
    let length = Math.ceil(Object.entries(list).length / n)
    return length;
}