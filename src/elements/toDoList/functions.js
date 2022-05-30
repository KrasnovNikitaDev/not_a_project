export const set_toDoList = ({pathname, search}, list) => {
    let param = search.slice(6);

    switch (pathname) {
        case "/": return list.filter(elem => {
           return elem.date === param && elem.done === false
        });
        case "/done": return list.filter(elem => {
            return elem.date === param && elem.done === true
        });
        case "/all": return list;
        default: return [];
    }
}