import React, { memo, useContext } from "react";
import './style_calendar.scss';
import { useSelector, useDispatch } from "react-redux";
import * as helper from './render_elememts_for_calendar.js';
import { WeekDays, DataPicker } from "./DatePickerComponent.jsx";
import { MonthPicker } from "./MonthPickerComponent.jsx";
import { YearPicker } from "./YearPickerComponent.jsx";
import * as action from '../../store/action.js';
import { useSearchParams } from "react-router-dom";
import { ThemeContext } from "../../App.jsx";


const Header = ({ date, month, year }) => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();



    const selectMonth = () => helper.set_date_picker('month-next');
    const selectYear = () => helper.set_date_picker('year-next');

    const prev = () => helper.prevArrow(dispatch, month, year);
    const next = () => helper.nextArrow(dispatch, month, year);

    const set_today = () => {
        dispatch(action.SET_TODAY);
        setSearchParams({ date: new Date().toLocaleDateString() })
    }


    return (
        <header>
            <div>
                {
                    month !== undefined ?
                        <h2 className="date_title" onClick={selectMonth}>{helper.month(month)} {year}</h2> :
                        <h2 className="date_title" onClick={selectYear}>{year}</h2>
                }
                {
                    date && <h5 className="back_today" onClick={set_today}>
                        {helper.currentDate + ' '}
                        {helper.array_of_month_for_date[helper.currentMonth] + ' '}
                        {helper.currentYear}
                    </h5>
                }
            </div>
            <div className="arrows">
                <h2 onClick={prev}>&#10094;</h2>
                <h2 onClick={next}>&#10095;</h2>

            </div>
        </header>
    )
}

const Years = ({ date }) => {
    return <>
        <div className="year">
            <Header />
            <div className="emty"></div>

            <main>
                <YearPicker date={date} />
            </main>
        </div>
    </>
}


const Month = memo(({ date }) => {
    return <>
        <div className="month">
            <Header
                year={date.currentYear}
            />
            <div className="emty"></div>
            <main>
                <MonthPicker date={date} />
            </main>
        </div>
    </>
})



const DateComponent = ({ date, list }) => {
    return <>
        <div className="date">
            <Header
                date={date}
                month={date.currentMonth}
                year={date.currentYear}
            />
            <WeekDays days={helper.array_of_days} />
            <main>
                <DataPicker date={date} list={list} />
            </main>
        </div>
    </>
}


export const Calendar = () => {
    const dateState = useSelector(store => store.calendar_reducer);
    const {list} = useSelector(store => store.user_reducer);

    const theme = useContext(ThemeContext);


    return (
        <div className={"calendar_wrapp " + theme}>
            <DateComponent date={dateState} list={list}/>
            <Month date={dateState} />
            <Years date={dateState} />
        </div>
    )
}