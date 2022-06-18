import React, { useRef } from "react";
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";



export const User = () => {
    const { name } = useSelector(store => store.user_reducer.user);
    const isSmallMonitor = useMediaQuery({ maxWidth: 1299 });
    const isFullHDMonitor = useMediaQuery({ minWidth: 1300 });
    const user_panel = useRef(null);

    const showUser = () => user_panel.current.classList.toggle('show_user');

    const innerUserName = (monitor) => {
        switch (monitor) {
            case "fullHD": return (<>
                <div className="avatar" ></div>
                {
                    name ? <h3>{name}</h3> : <h3 style={{ opacity: "0" }}>hidden</h3>
                }
            </>
            );
            case "small": return (<>
                <div
                    className="avatar"
                    onMouseEnter={showUser}
                    onMouseLeave={showUser}>
                    <div
                        className="avatar_img"
                    ></div>
                </div>
                <div
                    className="user_panel"
                    ref={user_panel}
                >
                    {
                        name ? <h3>{name}</h3> : <h3 style={{ opacity: "0" }}>hidden</h3>
                    }
                </div>
            </>
            );
        }
    }

    return <div className="user">
        {isFullHDMonitor && innerUserName('fullHD')}
        {isSmallMonitor && innerUserName('small')}
    </div>
}


