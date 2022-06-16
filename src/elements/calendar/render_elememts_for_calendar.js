import * as action from '../../store/action.js';

export const array_of_days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Cб", "Вс"];

export const array_of_month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const array_of_month_value = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

export const array_of_month_for_date = array_of_month_value.map(elem => elem[0].toLocaleLowerCase() + elem.slice(1))

export const currentMonth = new Date().getMonth();

export const currentYear = new Date().getFullYear();

export const currentDate = new Date().getDate();

let yearCount = 0;

const params_for_date_links = (date, month, year) => {
    if (month < 1) {
        month = 12;
        year -= 1;
    }
    if (month > 12) {
        month = 1;
        year += 1;
    }

    if (month < 10) month = '0' + month;
    if (date < 10) date = '0' + date;

    return `${date}.${month}.${year}`;
}


/* =====================START DATE_PICKER_COMPONENT===================== */
export const month = (n) => array_of_month[n];


export const render_dates = (date, list) => {
    let has_tasks = is_date_get_task(list);


    let arr = [];
    let count = 0;

    let daysInCurrentMonth = new Date(
        new Date().setMonth(date.currentMonth + 1, 0)
    ).getDate();

    let whichDayWasFirstDate = new Date(
        new Date().setFullYear(date.currentYear, date.currentMonth, 1)
    ).getDay() - 1;

    let whichDayWasLastDate = new Date(
        new Date().setFullYear(date.currentYear, date.currentMonth + 1, 0)
    ).getDay();




    {
        if (whichDayWasFirstDate < 0) whichDayWasFirstDate = 6;


        let datesPrevMonth = new Date(
            new Date().setFullYear(date.currentYear, date.currentMonth, 0)
        ).getDate();

        for (let i = 0; i < whichDayWasFirstDate; i++) {
            let o = {
                v: datesPrevMonth,
                n: datesPrevMonth,
                class_name: 'prev_month_date',
                link_params: params_for_date_links(datesPrevMonth, date.currentMonth, date.currentYear)
            }

            i === 0 && arr.push([]);

            arr[count].push(o);
            datesPrevMonth--;
        }

        arr[0] === undefined ? false : arr[0].reverse();
    }

    {
        for (let i = 0; i < daysInCurrentMonth; i++) {

            let o = {
                v: i + 1,
                n: i + 1,
                class_name: 'month_date',
                link_params: params_for_date_links(i + 1, date.currentMonth + 1, date.currentYear)
            }

            if (has_tasks.hasOwnProperty([date.currentYear])) {
                if (has_tasks[date.currentYear].hasOwnProperty([date.currentMonth])) {
                    has_tasks[date.currentYear][date.currentMonth].forEach(item => {
                        if (o.v === +item) o.class_name += " has_tasks";
                    })
                }
            }

            if (o.v === date.today && currentMonth === date.currentMonth && currentYear === date.currentYear) o.class_name += ' today select_date';

            if (o.v === date.selectDate) o.class_name += ' select_date';

            if (arr[0] === undefined) arr.push([]);

            arr[count].push(o);

            if (arr[count].length === 7) {
                count++;
                arr.push([])
            }
        }
    }
    {
        let number = 1

        for (let i = whichDayWasLastDate; i <= 6; i++) {
            let o = {
                v: number,
                n: 1 + i,
                class_name: 'next_month_date',
                link_params: params_for_date_links(number, date.currentMonth + 2, date.currentYear)


            }

            arr[count].push(o);
            number++;
        }

        if (count !== 5) {
            count = 5;
            arr.push([])

            for (let i = 0; i <= 6; i++) {
                let o = {
                    v: number,
                    n: 1,
                    class_name: 'next_month_date',
                    link_params: params_for_date_links(number, date.currentMonth + 2, date.currentYear)

                }

                arr[count].push(o);
                number++;
            }
        }
    }

    return arr
}
/* =====================EDN DATE_PICKER_COMPONENT===================== */


/* =====================START MONTH_PICKER_COMPONENT===================== */

export const render_months = (value) => {
    let arrMatrix = []
    let count = 0;

    for (let i = 0; i < array_of_month.length; i++) {
        let o = {
            v: array_of_month[i].slice(0, 3),
            n: i,
            className: 'data_elem',
        }

        if (i % 4 === 0) {
            arrMatrix.push([])
            count++;
        }

        if (currentMonth === i && currentYear === value.currentYear) o.className += ' active_month';

        arrMatrix[count - 1].push(o)
    }

    return arrMatrix;
}

/* =====================END MONTH_PICKER_COMPONENT===================== */

export const set_date_picker = (value, data) => {
    let month = document.querySelector('.month');
    let date = document.querySelector('.date');
    let year = document.querySelector('.year');

    if (value === 'month-next' && !data) {
        month.classList.toggle('show');
        date.classList.toggle('hide');
    }
    else if (value === 'year-next' && !data) {
        month.classList.add('hide');
        year.classList.toggle('show');
    }
}


export const select_date = ({ target }) => {
    let elem = document.querySelectorAll('.select_date');
    elem.forEach(elem => elem.classList.remove('select_date'));
    target.classList.add('select_date');
}


export const set_date = (e, n, dispatch) => {
    select_date(e);
    dispatch(action.SET_DATE(n));
}


export const set_date_prev_next_month = (arg, n, dispatch) => {
    arg === 'next' ?
        dispatch(action.SET_DATE_NEXT_MONTH(n)) :
        dispatch(action.SET_DATE_PREV_MONTH(n));
}


export const prevArrow = (dispatch, month, year) => {
    if (!(month || month === 0) && year) {
        dispatch(action.PREV_YEAR);
    }
    if (!month && !year) {
        yearCount -= 9;
        dispatch(action.SET_YEAR(currentYear + yearCount))
    }
    if (month || month === 0 && year) {
        dispatch(action.SET_DATE_PREV_MONTH())
    }
}


export const nextArrow = (dispatch, month, year) => {
    if (!(month || month === 0) && year) {
        dispatch(action.NEXT_YEAR);
    }
    if (!month && !year) {
        yearCount += 9;
        dispatch(action.SET_YEAR(currentYear + yearCount))
    }
    if (month || month === 0 && year) {
        dispatch(action.SET_DATE_NEXT_MONTH())
    }
}

export const selectItem = (e, value, dispatch, obj) => {
    let month = document.querySelector('.month');
    let date = document.querySelector('.date');
    let year = document.querySelector('.year');

    if (value === 'month') {
        dispatch(action.SET_MONTH(obj.n));
        month.classList.toggle('show');
        date.classList.toggle('hide');
    } else {
        dispatch(action.SET_YEAR(obj.v));
        year.classList.toggle('show');
        month.classList.toggle('hide');
        month.classList.add('show');
    }
}


export function render_years(value) {
    let arrMatrix = []
    let count = 0;

    for (let i = 0; i < 9; i++) {
        let o = {
            v: value - 4 + i,
            n: i + 1,
            className: 'data_elem',
        }

        if (i % 3 === 0) {
            arrMatrix.push([])
            count++;
        }

        if (o.v === currentYear) o.className += ' active_year';

        arrMatrix[count - 1].push(o)
    }

    return arrMatrix;
}



function is_date_get_task(list) {
    let obj = {}

    for (let props of Object.keys(list)) {
        let [year, month, date] = props.split('.').reverse();
        month -= 1;

        if (obj[year] === undefined) obj[year] = {};
        if (obj[year][month] === undefined) obj[year][month] = [];
        obj[year][month].push(date)

    }

    return obj

}
