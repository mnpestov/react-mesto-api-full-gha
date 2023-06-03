import React from "react";

function PopupWithForm({isOpen, onClose, name, title, buttonText, children, onSubmit}) {
    return (
        <form onSubmit={onSubmit} name={`${name}`} className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close opacity-transition opacity-transition_type_medium" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>

                <fieldset className="popup__set">
                    {children}
                    <button type="submit"
                        className="button button_type_submit button_type_save opacity-transition opacity-transition_type_large">{buttonText}</button>
                </fieldset>


            </div>
        </form>
    );

}

export default PopupWithForm;