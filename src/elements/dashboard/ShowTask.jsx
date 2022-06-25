import React, { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';





const ShowTask = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get('data');
    const state = useSelector(store => store.user_reducer.list);
    const navigation = useNavigate();
    const [array, setArray] = useState({
        task_list: [],
        done_task_list: []
    })

    useEffect(
        () => {
            setArray(state[param])
        }
        , [])

    const back = () => navigation(-1)

    return <div className='show_task'>
        <h3 onClick={back}>BACK</h3>
        <table>
            <tbody>
                <tr>
                    <th>ВЫПОЛНЕННО</th>
                </tr>
                {
                    array.done_task_list.map((item, i) => <tr key={i}><td>{item.value}</td></tr>)
                }
                <tr>
                    <th>НЕ ВЫПОЛНЕННО</th>
                </tr>
                {
                    array.task_list.map((item, i) => <tr key={i}><td>{item.value}</td></tr>)
                }
            </tbody>
        </table>
    </div>
}

export default ShowTask;