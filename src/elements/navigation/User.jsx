import React from "react";
import './style_nav.scss';
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";



export const User = () => {
    const { name } = useSelector(store => store.user_reducer.user);
    const isSmallMonitor = useMediaQuery({ maxWidth: 1299 });
    const isFullHDMonitor = useMediaQuery({ minWidth: 1300 });

    return <div className="user">
        <div className="avatar"></div>
        {
            isFullHDMonitor &&
            <h3>{name}</h3> || <h3 style={{ opacity: "0" }}>hidden</h3>
        }
    </div>
}


