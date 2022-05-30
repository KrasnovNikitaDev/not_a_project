import React from "react";
import './style_nav.scss';
import { useSelector } from 'react-redux';



export const User = () => {
    const user = useSelector(store => store.user_reducer.user);

    return <div className="user">
        <div className="avatar"></div>
        <h3>{user.mail}</h3>
    </div>
}


