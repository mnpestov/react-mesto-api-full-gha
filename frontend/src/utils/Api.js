class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._checkResponse)
    }

    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    patchUserAvatar(inputValue) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: inputValue.avatar,
            })
        })
            .then(this._checkResponse)
    }

    patchUserInfo(inputValue) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValue.name,
                about: inputValue.about
            })
        })
            .then(this._checkResponse)
    }

    postCard(inputValue) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValue.name,
                link: inputValue.link
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
    }

    putLike(cardId, isLiked) {
        if (isLiked) 
        {return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._checkResponse)}
            else {
                return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                    method: 'DELETE',
                    headers: {
                        authorization: this._authorization
                    }
                })
                    .then(this._checkResponse)
            }
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._checkResponse)
    }
}

const api = new Api(
    {
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51',
        headers: {
            authorization: '3d5cca3f-8a8e-42db-8df2-befb64932740',
            'Content-Type': 'application/json'
        }
    }
);

export default api;