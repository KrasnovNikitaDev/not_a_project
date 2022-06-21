import React, {useContext} from 'react';
import "./about_style.scss"
import { ThemeContext } from '../../App.jsx';
import { useEffect } from 'react';
import { weather } from './Weather.js';

export const About = () => {
    const theme  = useContext(ThemeContext);
    console.log(weather);


    
    return <div className={"about " + theme}>
        <p>Резюме</p>
        <ul>
            <li></li>
        </ul>
        
    </div>
}