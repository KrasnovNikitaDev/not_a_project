import React, { useContext, useState, useEffect } from 'react';
import "./weather_style.scss";
import { ThemeContext } from '../../App.jsx';
import { getWeather } from './Weather.js';
import load from "../../assets/images/ZZ5H.gif";

const Weather = ({ data, theme }) => {
    let icon, temp, description, img;

    icon = data.weather[0].icon;
    temp = Math.ceil(data.main.temp);
    description = data.weather[0].description;
    img = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    temp = temp > 0 && "+ " + temp;

    return <div className={"weather " + theme}>
        <p>{data.name}</p>
        <img src={img} alt="" className='weather_icon'/>
        <p>{temp}</p>
        <p>{description}</p>
    </div>
}


export const WeatherComponent = () => {
    const [weather, setWeather] = useState(undefined);
    const theme = useContext(ThemeContext);

    

    useEffect(
        () => {
            getWeather(setWeather)
            let getWeatherData = setInterval(() => getWeather(setWeather), 60000)
         return () => {
            console.log('unmount');
            clearInterval(getWeatherData)
         }
        }
    , [])

    return <>
        { weather ? 
            <Weather data={weather} theme={theme}/>:
            <div className={"weather " + theme}>
                <img src={load} alt="" className='loading'/>
            </div>
        }
    </>
}


