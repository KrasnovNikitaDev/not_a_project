import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../App.jsx';
import "./table_style.scss";
import { Table } from './Table.jsx';
import { useSelector } from "react-redux";
import { pagination, pag_length, custom_sort } from './table_function.js';
import { useSearchParams } from "react-router-dom";
import { Pagination } from "./Pagination.jsx"



const Dashboard = (() => {
    const theme = useContext(ThemeContext);
    
    const { list } = useSelector(store => store.user_reducer);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page');
    

    const [state, setState] = useState({
        renderArray: [],
        count: 7,
        sorted: null,
    });

    useEffect(
        () => {
            if(state.sorted){
                setState(state => ({
                    ...state,
                    renderArray: pagination(state.sorted, state.count, page).map(i => i),
                    pagLength: pag_length(list, state.count),
                    pageNumber: parseInt(page),
                }))
            } else {
                setState(state => ({
                    ...state,
                    renderArray: pagination(list, state.count, page).map(i => i),
                    pagLength: pag_length(list, state.count),
                    pageNumber: parseInt(page),
                }))
            }
        }
    , [list, page, state.count, state.sorted])


    const pag = (v) => {
        if (v > 15) v = 15;
        if (v < 1) v = 1;

        setState(state => ({ ...state, count: parseInt(v) }))
    }

    const sort = (arg) => {
        setState(state => ({
            ...state,
            sorted: custom_sort(arg, list).map(x => x)
        })
        )

    };


    return <main id='dashboard' className={theme}>
        <Table
            state={ state.renderArray}
            sort={sort}
            tableDep= {{
                param: page,
                arrayDep: state.renderArray
            }}
        />
        <Pagination
            func={pag}
            num={state.pagLength}
            page={page}
            count={state.count} 

            />
    </main>
})

export default Dashboard;