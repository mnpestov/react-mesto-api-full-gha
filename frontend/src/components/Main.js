import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button type="button" className="profile__avatar-container" onClick={onEditAvatar}>
                    <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button"
                        className="button button_type_edit opacity-transition opacity-transition_type_medium" onClick={onEditProfile} />
                    <p className="profile__about-me">{currentUser.about}</p>
                </div>
                <button type="button" className="button button_type_add opacity-transition opacity-transition_type_medium" onClick={onAddPlace} />
            </section>
            <section className="elements">
                <ul className="elements-list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            {...card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete} />
                    ))}
                </ul>
            </section>
        </main>
    );
}
export default Main;