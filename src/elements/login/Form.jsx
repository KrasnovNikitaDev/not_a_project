import React, { useState } from "react";
import { Login } from "./Login.jsx";
import { Signin } from './Signin.jsx';


export const Form = ({ setLoginFunction }) => {
    const [state, setstate] = useState(true);
    const changeState = () => setstate(() => !state)


    return <div className="form_block">
        {state ?
            <Login 
                setSignIn = {changeState} 
                setLoginFunction={setLoginFunction}
            /> :
            <Signin 
                setLogin = {changeState} 
                setLoginFunction={setLoginFunction}
            />
        }
    </div>
}
