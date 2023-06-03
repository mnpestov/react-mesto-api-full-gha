import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const [url, setUrl] = React.useState('');
    const avatarRef = React.useRef();

    React.useEffect(() => {
        setUrl('');
    }, [isOpen]);

    function handleChangeAvatar() {
        setUrl(avatarRef.current.value);
    }
    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: url,
        });
    }


    return (
        <PopupWithForm
            title={'Обновить аватар'}
            name={'edit-avatar'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}>

            <label className="popup__field">
                <input
                    type="url"
                    value={url || ''}
                    ref={avatarRef}
                    onChange={handleChangeAvatar}
                    name="avatar"
                    placeholder="Ссылка на аватар"
                    className="popup__input popup__input_type_url"
                    id="url-avatar-input"
                    autoComplete="off"
                    required />
                <span className="popup__input-error name-input-error"></span>
            </label>

        </PopupWithForm>
    );
}
export default EditAvatarPopup;