import React, { useContext, lazy, useState, useEffect } from 'react';
import { ThemeContext } from '../../App.jsx';
import "./dashboard_style.scss";
import { Table } from './Table.jsx';
import { useSelector } from "react-redux";
import { pagination, pag_length } from './dashboard_function.js';


// активная страница
// стрелки
// максимум 4 странцы в пагинации
// поправить ортировку



const Pagination = ({ func, num , setPage}) => {
    let arr = new Array(num).fill('')
    
    const fn = ({ target }) => func(target.value);

    const page = ({target}) => setPage(target.innerText)

    return <div className='pagination'>
        <input type="text" name="" id="" onChange={fn} />

        {
            arr.map((x, i) => <h3 onClick={page} style={{margin: "10px"}}>{i + 1}</h3>)
        }
    </div>
}


const Dashboard = (() => {
    const theme = useContext(ThemeContext);
    const { list } = useSelector(store => store.user_reducer);

    const [state, setState] = useState({
        renderArray: [],
        dataAray: [],
        count: 5,
        pagLength: null,
    });

    useEffect(
        () => {
            setState(state => ({
                ...state,
                renderArray: pagination(list, state.count, state.pageNumber).map(x => x),
                dataAray: Object.entries(list),
                pagLength: pag_length(list, state.count)
            }))
        }
        , [list, state.count, state.pageNumber])


    const pag = (v) => setState(state => ({ ...state, count: parseInt(v) }))
    const setPageNumber = (v) => setState(state => ({ ...state, pageNumber: parseInt(v) }))


    return <main id='dashboard' className={theme}>
        <Table state={state.renderArray} />
        <Pagination func={pag} num={state.pagLength} setPage={setPageNumber}/>
    </main>
})

export default Dashboard;