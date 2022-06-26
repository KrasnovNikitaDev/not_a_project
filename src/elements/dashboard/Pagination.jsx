import React, { useContext, lazy, useState, useEffect } from 'react';
import { ThemeContext } from '../../App.jsx';
import "./dashboard_style.scss";
import { Table } from './Table.jsx';
import { useSelector } from "react-redux";
import { page_setting, pagination, pag_length, pag_page_array, custom_sort } from './dashboard_function.js';
import { useSearchParams } from "react-router-dom";



export const Pagination = ({ func, num, count }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get('page')
    const arr = pag_page_array(param, num);

    useEffect(
        () => page_setting(param, num)
    )

    const fn = ({ target }) => {
        func(target.value || 5);
        setSearchParams({ page: 1 })
    }

    const next = () => setSearchParams({ page: +param + 1 })
    const prev = () => setSearchParams({ page: +param - 1 })

    const set_page = ({ target }) => setSearchParams({ page: +target.innerText });

    return <div className='pagination'>
        <div className='for_input'>
            <p>Счетчик количества строк: {count}</p>
            <input
                type="range"
                min={1}
                max={15}
                step={1}
                defaultValue={count}
                onChange={fn}
                name="range"
            />
        </div>
        <div className='page_count'>
            {
                +param !== 1 ?
                    <h3 onClick={prev}>&#10094;</h3> :
                    <h3></h3>
            }
            {
                arr.map((item, i) => <h3 className="page" onClick={set_page}>{item}</h3>)
            }
            {
                +param !== num ?
                    <h3 onClick={next}>&#10095;</h3> :
                    <h3></h3>
            }
        </div>
    </div>
}
