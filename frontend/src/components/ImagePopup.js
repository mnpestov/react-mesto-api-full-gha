import React from "react";

function ImagePopup({ isOpen, onClose }) {
    return (
        <form name="imagePage" className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__image-container">
                <button type="button" className="popup__close opacity-transition opacity-transition_type_medium" onClick={onClose}></button>
                <img className="popup__image" src={isOpen ? isOpen.cardLink : ''} alt={isOpen ? isOpen.cadrName : ''} />
                <h4 className="popup__subtitle">{isOpen ? isOpen.cardName : ''}</h4>
            </div>
        </form>
    );
}

export default ImagePopup;