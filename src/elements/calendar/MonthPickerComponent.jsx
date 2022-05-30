import React from "react";
import * as helper from './render_elememts_for_calendar.js';
import { useDispatch } from "react-redux";



export const MonthPicker = ({ date }) => {
    const dispatch = useDispatch();
    const dataArray = helper.render_months(date);

    const select_month = (e, elem) => helper.selectItem(e, 'month', dispatch, elem)

    return <div className="month_in_year">
        {
            dataArray.map((row, i) => {
                return <div className="row" key={i}>
                    {
                        row.map((elem, i) => {
                            return <div
                                key={i}
                                className={elem.className}
                                onClick={(e) => select_month(e, elem)}>
                                {elem.v}
                            </div>
                        })
                    }
                </div>
            })
        }
    </div>
}