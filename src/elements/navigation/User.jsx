import React, { useEffect, useRef, useContext } from "react";
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";
import { ThemeContext } from "../../App.jsx";



export const User = () => {
    const { name } = useSelector(store => store.user_reducer.user);
    const isMobile = useMediaQuery({ maxWidth: 570 });
    const isSmallMonitor = useMediaQuery({ minWidth: 571, maxWidth: 1299 });
    const isFullHDMonitor = useMediaQuery({ minWidth: 1300 });
    const user_panel = useRef(null);
    const theme = useContext(ThemeContext);


    useEffect(
        () => {
            isMobile ?
                changeTheme(theme, 'add') :
                changeTheme(theme, 'remove');
        }
        , [isMobile, theme])

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
        {isMobile && innerUserName('fullHD')}
    </div>
}

function changeTheme(theme, arg) {
    let root = document.body;

    switch (arg) {
        case 'add': {
            if(root.className) root.classList.remove(root.className)
            root.classList.add(theme);
        }
            break;
        case 'remove': {
            root.classList.remove(theme)
        }
            break;
    }

}