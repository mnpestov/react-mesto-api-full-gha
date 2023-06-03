import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__trash' : 'element__trash_hidden'}`
    );

    const isLiked = props.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`${isLiked ? 'element__like_active' : 'opacity-transition_type_small'}`);

    function handleClick() {
        props.onCardClick({
            name: props.name,
            link: props.link
        })
    }
    function handleLikeClick() {
        props.onCardLike(props)
    }
    function handleDeleteClick() {
        props.onCardDelete(props)
    }

    return (
        <li className="element">
            <img className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
            <button type="button" className={`opacity-transition opacity-transition_type_medium ${cardDeleteButtonClassName}`} onClick={handleDeleteClick}></button>
            <div className="element__caption">
                <h2 className="element__title">{props.name}</h2>
                <div className="element__like-group">
                    <button type="button" className={`element__like opacity-transition ${cardLikeButtonClassName}`} onClick={handleLikeClick}></button>
                    <span className="element__like-counter">{props.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;