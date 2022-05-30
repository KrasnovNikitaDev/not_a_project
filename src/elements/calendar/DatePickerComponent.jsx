import React, { useEffect, useState } from "react";
import * as helper from './render_elememts_for_calendar.js';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation, useParams, Outlet, useOutletContext, useSearchParams } from "react-router-dom";


const Elem = ({ classN, data, fn }) => {
    const selectElem = (e) => {
        fn(e, data.v);
    }
    
    

    return (
        <Link
            className={classN}
            onClick={data ? selectElem : () => false}
            to={`?date=${data.link_params}`}
        >{data.v}
        </Link>
    )
}

export const WeekDays = ({ days }) => {
    return <div className="week_days">
        {
            days.map(elem => <div className="elem" key={elem}>{elem}</div>)
        }
    </div>
}


export const DataPicker = ({ date }) => {
    const dispatch = useDispatch();
    const state = helper.render_dates(date);

    const selectDate = (e, n) => {
        let target = (value) => e.target.className.split(' ').includes(value);

        target('month_date') && helper.set_date(e, n, dispatch);

        target('prev_month_date') && helper.set_date_prev_next_month('prev', n, dispatch);

        target('next_month_date') && helper.set_date_prev_next_month('next', n, dispatch);
    }

    return <div className="month_dates">
        {
            state.map((row, i) => {
                return <div className="row" key={'row' + i}>{
                    row.map((elem, n) => {
                        return (
                            <Elem
                                classN={elem.class_name + ' data_elem'}
                                key={'row' + i + '-elem' + n}
                                fn={selectDate}
                                data={elem}
                            />
                        )
                    })
                }</div>
            })
        }
    </div>
}