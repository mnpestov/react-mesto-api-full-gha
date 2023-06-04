import React, { useEffect, useCallback, useState } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import ApiAuth from '../utils/ApiAuth';
import InfoTooltip from './InfoTooltip';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  const [userEmail, setUserEmail] = React.useState('');
  const [isRegisterOk, setIsRegisterOk] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState({
    isOpened: false,
    resOk: false
  });
  let jwt = localStorage.getItem('jwt');

  const cbAuthenticate = useCallback((data) => {
    localStorage.setItem('jwt', data.token);
    setLoggedIn(true);
  }, [])

  const checkToken = useCallback(async () => {
    try {
      let jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('no token')
      }
      const user = await ApiAuth.checkToken(jwt);
      if (!user) {
        throw new Error('invalid user')
      }

      if (user) {
        setLoggedIn(true);
        setUserEmail(user.data.email)
      }
    } catch(err) {
      console.log('Ошибка: ' + err)
    }
  }, [loggedIn])


  const cbLogin = useCallback(async (login, password) => {
    try {
      const data = await ApiAuth.login(login, password);
      if (!data) {
        throw new Error('Неверные имя или пароль пользователя')
      }
      if (data.token) {
        cbAuthenticate(data)
        setUserEmail(login)
      }
      return data;
    } catch {
      setIsInfoTooltipOpen({
        isOpened: true,
        resOk: false
      })
    }
  }, [cbAuthenticate])

  const cbRegister = useCallback(async (password, email) => {
    try {
      const data = await ApiAuth.register(password, email);
      setIsInfoTooltipOpen({
        isOpened: true,
        resOk: true
      });
      setIsRegisterOk(true);
      return data;
    } catch {
      setIsInfoTooltipOpen({
        isOpened: true,
        resOk: false
      })
    }
  }, [])

  const cbLogout = useCallback(() => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserEmail('')
  }, [])


  useEffect(() => {
    checkToken();
  }, [checkToken])

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch(err => console.log('Ошибка', err));
      api.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch(err => console.log('Ошибка', err));
    }

  }, [jwt])

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке 
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.putLike(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log('Ошибка', err));
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
      .catch(err => console.log('Ошибка', err));
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setIsRegisterOk(false);
    setIsInfoTooltipOpen({
      ...isInfoTooltipOpen,
      isOpened: false,
    })
  }
  function handleCardClick({ name, link }) {
    setSelectedCard({
      cardName: name,
      cardLink: link
    });
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleUpdateUser(inputValue) {
    api.patchUserInfo(inputValue)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка', err));
  }
  function handleUpdateAvatar(inputValue) {
    api.patchUserAvatar(inputValue)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(err => console.log('Ошибка', err));
  }
  function handleAddPlaceSubmit(inputValue) {
    api.postCard(inputValue)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка', err));

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="body">
        <div className="page">
          <Header
            email={userEmail}
            isLoggedIn={loggedIn}
            handleLogout={cbLogout}
            isLoginForm={isLoginForm}
          />
          <Switch>
            <ProtectedRoute
              exact path='/'
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}>
            </ProtectedRoute>
            <Route path='/signup'>
              <Register
                setIsLoginForm={setIsLoginForm}
                isLoggedIn={loggedIn}
                onRegister={cbRegister}
                title={'Регистрация'}
                buttonText={'Зарегистрироваться'}
                isRegisterOk={isRegisterOk}
              />
            </Route>
            <Route path='/signin'>
              <Login
                setIsLoginForm={setIsLoginForm}
                isLoggedIn={loggedIn}
                onLogin={cbLogin}
                title={'Вход'}
                buttonText={'Войти'}
              />
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />
          <ImagePopup
            isOpen={selectedCard}
            onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups} />
        </div>
      </div>


    </CurrentUserContext.Provider>
  );
}

export default App;
