import React from "react";
import FormWithAuth from './FormWithAuth';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function Login({ setIsLoginForm, isLoggedIn, onLogin, title, buttonText }) {
    const [userData, setUserData] = React.useState({
        username: '',
        password: '',
    })

    React.useEffect(() => {
        setIsLoginForm(true);
    }, [])

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    //onLogin(userData.username, userData.password);
    function handelSubmit(e) {
        e.preventDefault();
        if (!userData.username || !userData.password) {
            return;
        }
        onLogin(userData.username, userData.password);
    }
    if (isLoggedIn) {
        return <Redirect to="/" />
    }
    return (
        <FormWithAuth userData={userData} handleChange={handleChange} handelSubmit={handelSubmit} title={title} buttonText={buttonText} />
    )
}

export default Login;