import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { render_table, custom_sort } from './dashboard_function.js';


export const TBody = ({ state }) => {

    return <tbody>
        {
            state.map((elem, i) => {
               const { property, all_tasks, task, done } = render_table(elem);
                return <tr>
                    <td>{property}</td>
                    <td>{all_tasks}</td>
                    <td>{done}</td>
                    <td>{task}</td>
                </tr>
            }) 
        }
    </tbody>
}



export const THead = ({ sortUp, sortDown }) => {
    return <thead>
        <tr>
            <th>
                <div>
                    <p>Дата</p>
                    <div onClick={() => sortUp(['date', 'up'])}>&#8593;</div>
                    <div onClick={() => sortDown(['date', 'down'])}>&#8595;</div>
                </div>
            </th>
            <th>
                <div>
                    <p>Всего задач</p>
                    <div  onClick={() => sortUp(['tasks', 'up'])}>&#8593;</div>
                    <div  onClick={() => sortDown(['tasks', 'down'])}>&#8595;</div>
                </div>
            </th>
            <th>
                <div>
                    <p>Выполненно</p>
                    <div onClick={() => sortUp(['done', 'up'])}>&#8593;</div>
                    <div onClick={() => sortDown(['done', 'down'])}>&#8595;</div>
                </div>
            </th>
            <th>
                <div>
                    <p>Не выполненно</p>
                    <div onClick={() => sortUp(['not-done', 'up'])}>&#8593;</div>
                    <div onClick={() => sortDown(['not-done', 'down'])}>&#8595;</div>
                </div>
            </th>
        </tr>
    </thead>
}


export const Table = ({state}) => {
   
    const sortUp = (arg) => setState(() => custom_sort(arg, state).map(x => x));
    const sortDown = (arg) => setState(() => custom_sort(arg, state).map(x => x));

    return <table>
        <THead
            sortUp={sortUp}
            sortDown={sortDown}
        />
        <TBody 
            state={state}
             />
    </table>
}