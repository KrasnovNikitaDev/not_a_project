import React from 'react';
import Switch from '@mui/material/Switch';


export const StyleMode = ({ handleSwitch, mode }) => {
    const state = mode === 'light' ? true : false;
    const onChange = (e) => handleSwitch(e);

    return (
        <div className='mode_switcher'>
            <label htmlFor='switch'>
                <h5>{state ? "светлая тема" : "темная тема"}</h5>
            </label>
            <Switch
                id='switch'
                defaultChecked={!state}
                onChange={onChange}
            />

        </div>
    );
}
