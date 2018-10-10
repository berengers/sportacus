import 'whatwg-fetch'

function ExtendableBuiltin(cls){
    function ExtendableBuiltin(){
        cls.apply(this, arguments);
    }
    ExtendableBuiltin.prototype = Object.create(cls.prototype);
    Object.setPrototypeOf(ExtendableBuiltin, cls);

    return ExtendableBuiltin;
}

export class AuthorizationError extends ExtendableBuiltin(Error){
}

class DB{
  constructor(){
    this.url = 'http://localhost:5000'
    this.contentType = { 'Content-Type' : 'application/json' }
  }
  token(){
    return localStorage.getItem('token')
  }
  _headers() {
    return {
      ...this.contentType,
      'X-Authenticate' : this.token()
    }
  }
  _json(resp){
    return resp.json()
  }
  _status(resp){
    if (resp.status >= 200 && resp.status < 300) {
      return Promise.resolve(resp)
    } else if (resp.status == 401 || resp.status == 403) {
      throw new AuthorizationError()
    } else {
      return Promise.reject(new Error(resp.statusText))
    }
  }
  fetchPrograms(){
    return fetch(
      this.url + '/programs',
      {
        method : 'GET',
        headers: this._headers()
      }
    )
    .then(this._status)
    .then(this._json)
  }
}

export const db = new DB()
