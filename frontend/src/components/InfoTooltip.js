import React from "react";
import okIcon from '../images/ok.svg';
import failIcon from '../images/fail.svg';

function InfoTooltip({ isOpen, onClose }) {

    return (

        <div
            className={`popup${isOpen.isOpened ? ' popup_opened' : ''}`}
            
        >
            <div className={'popup__container'}>
                {isOpen.resOk ? (
                    <div className="popup__registred">
                        <img className="popup__img-registred" src={okIcon} alt="Иконка с галочкой." />
                        <p className="popup__text-registred">Вы успешно зарегистрировались!</p>
                    </div>
                ) : (
                    <div className="popup__registred">
                        <img className="popup__img-registred" src={failIcon} alt="Иконка с крестиком." />
                        <p className="popup__text-registred">
                            Что-то пошло не так! Попробуйте ещё раз.
                        </p>
                    </div>
                )}
                <button
                    className="popup__close popup__close_registred opacity-transition opacity-transition_type_medium"
                    type="button"
                    aria-label="Закрыть форму."
                    onClick={onClose}
                />
            </div>
        </div>


    )
}

export default InfoTooltip;