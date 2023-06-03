import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (

        <PopupWithForm
            title={'Редактировать профиль'}
            name={'edit'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}>

            <label className="popup__field">
                <input
                    type="text"
                    value={name || ''}
                    onChange={handleChangeName}
                    name="name" placeholder="Имя"
                    className="popup__input popup__input_type_name"
                    id="name-input"
                    autoComplete="off"
                    minLength="2"
                    maxLength="40"
                    required />
                <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="text"
                    value={description || ''}
                    onChange={handleChangeDescription}
                    name="about"
                    placeholder="О себе"
                    className="popup__input popup__input_type_about-me"
                    id="about-me"
                    autoComplete="off"
                    minLength="2"
                    maxLength="200"
                    required />
                <span className="popup__input-error about-me-error"></span>
            </label>

        </PopupWithForm>
    );
}

export default EditProfilePopup;