import React, { useState } from 'react';
import { useEffect } from 'react';
import { render_table } from './dashboard_function.js';


export const TBody = ({ list }) => {

    return <tbody>
        {
            list.map((elem, i) => {
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



export const THead = ({ sort }) => {
    return <thead>
        <tr>
            <th>
                <div>
                    <p>Дата</p>
                    <div onClick={() => sort(['date', 'up'])}>&#8593;</div>
                    <div onClick={() => sort(['date', 'down'])}>&#8595;</div>
                </div>
            </th>
            <th>
                <div>
                    <p>Всего задач</p>
                    <div onClick={() => sort(['tasks', 'up'])}>&#8593;</div>
                    <div onClick={() => sort(['tasks', 'down'])}>&#8595;</div>
                </div>
            </th>
            <th>
                <div>
                    <p>Выполненно</p>
                    <div onClick={() => sort(['done', 'up'])}>&#8593;</div>
                    <div onClick={() => sort(['done', 'down'])}>&#8595;</div>
                </div>
            </th>
            <th>
                <div>
                    <p>Не выполненно</p>
                    <div onClick={() => sort(['not-done', 'up'])}>&#8593;</div>
                    <div onClick={() => sort(['not-done', 'down'])}>&#8595;</div>
                </div>
            </th>
        </tr>
    </thead>
}


export const Table = ({ state, sort }) => {
  
    return <table>
        <THead
            sort={sort}
        />
        <TBody
            list={state}
        />
    </table>
}