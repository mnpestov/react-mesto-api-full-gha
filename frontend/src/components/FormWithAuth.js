import React from "react";

function FormWithAuth({ userData, handleChange, handelSubmit, title, buttonText }) {
    return (
        <form className="login__form" onSubmit={handelSubmit}>
            <label className="login__inputs">
                <h2 className="login__title">{title}</h2>
                

                <input
                    className="login__input login__input_type_email"
                    type="email"
                    placeholder="Email"
                    name="username"
                    onChange={handleChange}
                    value={userData.name}
                    required />
                <input
                    className="login__input login__input_type_password"
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    onChange={handleChange}
                    value={userData.password}
                    required />
            </label>
            <button type="submit" className="button button_type_login">{buttonText}</button>
        </form>
    )
}

export default FormWithAuth;