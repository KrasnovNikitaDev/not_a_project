import React from "react";
import './style_nav.scss';
import { useSelector } from 'react-redux';



export const User = () => {
    const { name } = useSelector(store => store.user_reducer.user);

    return <div className="user">
        <div className="avatar"></div>
        { <h3>{name}</h3> || <h3 style={{ opacity: "0" }}>hidden</h3>}
    </div>
}


