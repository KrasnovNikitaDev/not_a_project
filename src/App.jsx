import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Calendar } from "./elements/calendar/Calendara.jsx";
import { Navigation } from "./elements/navigation/Navigation.jsx";
import { Form } from "./elements/login/Form.jsx";
import { ToDOList } from "./elements/toDoList/List.jsx";
import { List } from "./elements/toDoList/List.jsx";
import { LIST } from "./LIST.jsx";




const Modal = ({ fn }) => {
    return ReactDOM.createPortal(
        <div className="modal_wrapper">
            <Form setLoginFunction={fn} />
        </div>
        , document.querySelector('#modal'))
}



const Main = () => {
    return <main>
        <ToDOList />
        <Calendar />
    </main>
}




export default function App() {
    const isLogin = localStorage.getItem('login') ? true : false;

    const [login, setLogin] = useState(isLogin);
    
    const handleLogin = () => setLogin(() => localStorage.getItem('login') ? true : false);
    
    return <>
        <div>
            <Navigation fn={handleLogin} />
        </div>
        <Routes>
            <Route path='/' element={<Main />} >
                <Route path="/"  element={<List />} />
                <Route path="done" element={<List />} />
                {/* <Route path="all" element={<List />} /> */}
            </Route>
            <Route path="dashboard" element={<LIST />}/>
        </Routes>
        {login || <Modal fn={handleLogin} />}
    </>
}