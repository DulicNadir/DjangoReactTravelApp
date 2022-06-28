import { useCookies } from 'react-cookie';

export default class APIService {
  static UpdateArticle(article_id, body, token) {
    return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static updateUser(user_id, body, token) {
    return fetch(`http://127.0.0.1:8000/api/users/${user_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static InsertArticle(body, token) {
    return fetch(`http://127.0.0.1:8000/api/articles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static DeleteArticle(article_id, token) {
    return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  }
  static LoginUser(body) {
    return fetch(`http://127.0.0.1:8000/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static RegisterUser(body) {
    return fetch(`http://127.0.0.1:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
  static prijaviSeNaPutovanje(body) {
    return fetch(`http://127.0.0.1:8000/api/userputovanja/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(body));
  }
  static dodajPutovanje(body) {
    return fetch(`http://127.0.0.1:8000/api/putovanja/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(body));
  }
  static dodajAgenciju(body) {
    return fetch(`http://127.0.0.1:8000/api/agencija/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(body));
  }
  static getAgencije() {
    return fetch('http://127.0.0.1:8000/api/agencija/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  đ;
}
