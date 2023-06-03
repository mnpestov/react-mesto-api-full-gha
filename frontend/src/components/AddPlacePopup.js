import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [url, setUrl] = React.useState('');
    const [nameImg, setNameImg] = React.useState('');

    React.useEffect(() => {
        setUrl('');
        setNameImg('');
    }, [isOpen]);

    function handleChangeNameImg(e) {
        setNameImg(e.target.value);
    }
    function handleChangeUrl(e) {
        setUrl(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: nameImg,
            link: url
        });
    }


    return (
        <PopupWithForm
            title={'Новое место'}
            name={'add'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Создать'}
            onSubmit={handleSubmit}>

            <label className="popup__field">
                <input
                    type="text"
                    value={nameImg || ''}
                    onChange={handleChangeNameImg}
                    name="name"
                    placeholder="Название"
                    className="popup__input popup__input_type_name-of-image"
                    id="name-of-image"
                    autoComplete="off"
                    minLength="2"
                    maxLength="30"
                    required />
                <span className="popup__input-error name-of-image-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="url"
                    value={url || ''}
                    onChange={handleChangeUrl}
                    name="link"
                    placeholder="Ссылка на картинку"
                    className="popup__input popup__input_type_url"
                    id="url-input"
                    autoComplete="off"
                    required />
                <span className="popup__input-error url-input-error"></span>
            </label>

        </PopupWithForm>
    );
}
export default AddPlacePopup;