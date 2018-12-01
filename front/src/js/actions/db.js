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
    // console.log ("resp ---> ", resp)
    // console.log ("resp.status ---> ", resp.status)
    // console.log ("resp.statusText ---> ", resp.statusText)
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
  fetchProgram(program_id){
    return fetch(
      this.url + '/programs/' + program_id,
      {
        method: 'GET',
        headers: this._headers()
      }
    )
    .then(this._status)
    .then(this._json)
  }
  fetchCreateProgram(name, visibility){
    return fetch(
      this.url + '/programs',
      {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify({ 'name': name, 'visibility': visibility })
      }
    )
    .then(this._status)
    .then(this._json)
  }
  fetchUpdateProgram(program){
    return fetch(
      this.url + '/programs',
      {
        method: "PUT",
        headers: this._headers(),
        body: JSON.stringify(program)
      }
    )
    .then(this._status)
  }
  fetchStep(id){
    return fetch(
      this.url + '/steps/' + id,
      {
        method: 'GET',
        headers: this._headers(),
      }
    )
    .then(this._status)
    .then(this._json)
  }
  fetchCreateStep(program_id, exercise_id){
    return fetch(
      this.url + '/steps',
      {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify({
          'program_id': program_id,
          'exercise_id': exercise_id
        })
      }
    )
    .then(this._status)
    .then(this._json)
  }
  fetchDeleteStep(id){
    return fetch(
      this.url + '/steps/' + id,
      {
        method: 'DELETE',
        headers: this._headers()
      }
    )
    .then(this._status)
  }
  fetchEditStep(id, repetitions, series, weight, rest, rest_end, program_id, exercise_id){
    return fetch(
      this.url + '/steps/' + id,
      {
        method: 'PUT',
        headers: this._headers(),
        body: JSON.stringify({
          'repetitions': repetitions,
          'series': series,
          'weight': weight,
          'rest': rest,
          'rest_end': rest_end,
          'program_id': program_id,
          'exercise_id': exercise_id
        })
      }
    )
    .then(this._status)
    .then(this._json)
  }
  fetchExercises(){
    return fetch(
      this.url + '/exercises',
      {
        method: 'GET',
        headers: this._headers()
      }
    )
    .then(this._status)
    .then(this._json)
  }
  fetchExercise(id){
    return fetch(
      this.url + '/exercises/' + id,
      {
        methods: "GET",
        headers: this._headers()
      }
    )
    .then(this._status)
    .then(this._json)
  }
  fetchCreateExercise(name, image, visibility){
    return fetch(
      this.url + '/exercises',
      {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify({
          'name': name,
          'image': image,
          'visibility': visibility
        })
      }
    )
    .then(this._status)
    .then(this._json)
  }
  fetchDeleteExercise(id){
    return fetch(
      this.url + '/exercises/' + id,
      {
        method: "DELETE",
        headers: this._headers()
      }
    )
    .then(this._status)
  }
  fetchEditExercise(id, name, image, visibility){
    return fetch(
      this.url + '/exercises/' + id,
      {
        method: 'PUT',
        headers: this._headers(),
        body: JSON.stringify({
          "name": name,
          "image": image,
          "visibility": visibility
        })
      }
    )
    .then(this._status)
    .then(this._json)
  }
  fetchToken(email, password){
    return fetch(
      this.url + '/login',
      {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify({
          'email': email,
          'password': password
        })
      }
    )
    .then(this._status)
    .then(this._json)
  }
  logout(){
    return fetch(
      this.url + '/logout',
      {
        method: "DELETE",
        headers: this._headers()
      }
    )
    .then(this._status)
  }
}

export const db = new DB()
