
const D = new Date();


const calendarState = {
    currentDay: D.getDay(),
    today: D.getDate(),
    selectDate: null,
    currentMonth: D.getMonth(),
    currentYear: D.getFullYear(),
}

export function calendarReducer(state = calendarState, action) {
    switch (action.type) {
        case "SET-DATE": return {
            ...state,
            selectDate: action.data
        };
        case "SET-MONTH": return {
            ...state,
            currentMonth: action.data,
            selectDate: null,
        };
        case "SET-YEAR": return {
            ...state,
            currentYear: action.data,
            selectDate: null,
        }
        case "SET-DATE-PREV-MONTH": return set_prev_next_month(
            "DEC",
            state,
            state.currentMonth,
            state.currentYear,
            action.data
        );
        case "SET-DATE-NEXT-MONTH": return set_prev_next_month(
            "INC",
            state,
            state.currentMonth,
            state.currentYear,
            action.data,
        );
        case "PREV-YEAR": return { ...state, currentYear: --state.currentYear };
        case "NEXT-YEAR": return { ...state, currentYear: ++state.currentYear };
        case "SET-TODAY": return {
            currentDay: D.getDay(),
            today: D.getDate(),
            selectDate: null,
            currentMonth: D.getMonth(),
            currentYear: D.getFullYear(),
        };

        default: return state;
    }
}


function set_prev_next_month(arg, state, m, y, d = null) {
    let obj1 = (n) => ({
        ...state,
        selectDate: d,
        currentMonth: n,
        currentYear: arg === 'INC' ? ++y : --y
    })

    let obj = (n) => ({
        ...state,
        selectDate: d,
        currentMonth: n,
    })

    if (arg === 'INC') {
        ++m;
        if (m > 11) return obj1(0);
        return obj(m);
    } else {
        --m;
        if (m < 0) return obj1(11);
        return obj(m);
    }

}

