const D = new Date();
const url = window.location.href;
const url_params = new URL(url).searchParams.get('date');
let date, month, year;

if(url_params) {
    const params = url_params && url_params.split('.');
    [date, month, year] = params.map(elem => parseInt(elem));
    month -= 1;
}

const value = (elem, x) => {
    if(elem === 0 || elem ) return elem;
    return x;
}

const calendarState = {
    currentDay: D.getDay(),
    today: D.getDate(),
    selectDate: value(date, null),
    currentMonth: value(month, D.getMonth()),
    currentYear: value(year, D.getFullYear()),
    date: D.toLocaleDateString(),
}

export function calendar_reducer(state = calendarState, action) {
    switch (action.type) {
        case "SET-DATE": return {
            ...state,
            selectDate: action.data,
            date: set_select_date(state, action.data, state.currentMonth)
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
            date: set_select_date(state, action.data, state.currentMonth)
        };

        default: return state;
    }
}


function set_prev_next_month(arg, state, m, y, d = null) {
    let obj1 = (n) => ({
        ...state,
        selectDate: d,
        currentMonth: n,
        currentYear: arg === 'INC' ? ++y : --y,
        date: set_select_date(state, d, m)
    })

    let obj = (n) => ({
        ...state,
        selectDate: d,
        currentMonth: n,
        date: set_select_date(state, d, m)
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


function set_select_date(obj, s_d, m) {
    m = m + 1;
    let d = obj.today;

    if (m < 10) m = '0' + m;
    if (d < 10) obj.d = '0' + d;
    if (s_d && s_d < 10) s_d = '0' + s_d;

    return s_d ?
        `${s_d}.${m}.${obj.currentYear}`:
        `${d}.${m}.${obj.currentYear}`;
}

