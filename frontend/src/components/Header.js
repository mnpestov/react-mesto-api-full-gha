import React from "react";
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ email, isLoggedIn, handleLogout, isLoginForm }) {
    const location = useLocation();
    return (
        <header className="header">
            <img className="logo" src={logo} alt={"Лого"} />
            <div className="header__menu">
                <p className="header__user-email">{email}</p>

                {location.pathname === '/' && (<button
                    className="button header__menu  opacity-transition opacity-transition_type_medium"
                    type="button"
                    onClick={handleLogout}
                >
                    {isLoggedIn ? "Выйти" : isLoginForm ? "Регистрация" : "Войти"}
                </button>)}
                {location.pathname === '/sign-in' && (
                    <Link to="/sign-up" className="button header__menu header__menu_unlogined  opacity-transition opacity-transition_type_medium">
                        Регистрация
                    </Link>
                )}
                {location.pathname === '/sign-up' && (
                    <Link to="/sign-in" className="button header__menu header__menu_unlogined  opacity-transition opacity-transition_type_medium">
                        Войти
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;