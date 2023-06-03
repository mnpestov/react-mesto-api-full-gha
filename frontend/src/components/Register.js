import React from "react";
import FormWithAuth from './FormWithAuth';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function Register({ isRegisterOk, setIsLoginForm, isLoggedIn, onRegister, title, buttonText }) {
    const [userData, setUserData] = React.useState({
        username: '',
        password: '',
    })

    React.useEffect(() => {
        setIsLoginForm(false);
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
        onRegister(userData.username, userData.password);
    }
    if (isRegisterOk) { 
        return <Redirect to="/sign-in" />
    }
    return (
        <FormWithAuth userData={userData} handleChange={handleChange} handelSubmit={handelSubmit} title={title} buttonText={buttonText} />
    )
}

export default Register;