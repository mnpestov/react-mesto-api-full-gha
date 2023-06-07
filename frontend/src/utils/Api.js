class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(this._checkResponse);
    }

    getUserInfo() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(this._checkResponse)
    }

    getAllInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    patchUserAvatar(inputValue) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: inputValue.avatar,
            })
        })
            .then(this._checkResponse)
    }

    patchUserInfo(inputValue) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputValue.name,
                about: inputValue.about
            })
        })
            .then(this._checkResponse)
    }

    postCard(inputValue) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputValue.name,
                link: inputValue.link
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(cardId) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    }

    putLike(cardId, isLiked) {
        const token = localStorage.getItem('jwt');
        if (isLiked) 
        {return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(this._checkResponse)}
            else {
                return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                    .then(this._checkResponse)
            }
    }

    deleteLike(cardId) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(this._checkResponse)
    }
}

const api = new Api(
    {
        // baseUrl: 'http://localhost:3000',
        baseUrl: 'https://api.mnpestov.nomoredomains.rocks',
    }
);

export default api;