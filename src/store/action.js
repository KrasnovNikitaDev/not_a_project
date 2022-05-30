import axios from "axios";


export const SET_DATE = (value) => ({ type: "SET-DATE", data: value });
export const SET_MONTH = (value) => ({ type: "SET-MONTH", data: value });
export const SET_YEAR = (value) => ({ type: "SET-YEAR", data: value });

export const SET_DATE_PREV_MONTH = (value) => ({ type: "SET-DATE-PREV-MONTH", data: value });
export const SET_DATE_NEXT_MONTH = (value) => ({ type: "SET-DATE-NEXT-MONTH", data: value });

export const PREV_YEAR = { type: "PREV-YEAR" };
export const NEXT_YEAR = { type: "NEXT-YEAR" };
export const SET_TODAY = { type: "SET-TODAY" };



export const USER = (value) => (dispatch) => {
    axios.get(`http://localhost:3000/tasks?user=${value.mail}`)
        .then(res => res.data[0])
        .then(data => {
            dispatch({
                type: "USER",
                user: { name: value.name, mail: value.mail },
                list: data.list
            })
        })
}
