import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  hostUrl = 'http://localhost:8080';
  token;
  user;
  options;

  register(user) {
    return this.http
      .post(this.hostUrl + '/auth/register', user)
      .map(res => res.json());
  }

  checkUsername(username) {
    return this.http
      .get(this.hostUrl + '/auth/checkUsername' + username)
      .map(res => res.json());
  }

  checkEmail(email) {
    return this.http
      .get(this.hostUrl + '/auth/checkEmail' + email)
      .map(res => res.json());
  }

  login(user) {
    return this.http
      .post(this.hostUrl + '/auth/login', user)
      .map(res => res.json());
  }

  createHeaders() {
    this.token = localStorage.getItem('token');
    this.options = new RequestOptions({
      headers: new Headers({
      'Content-Type': 'application/json',
      'authorization': this.token
    })});
  }

  getToken() {
    this.token = localStorage.getItem('token');
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    this.createHeaders();
    return this.http.get(this.hostUrl + '/auth/profile', this.options).map(res => res.json());
  }

  getPublicProfile(username) {
    this.createHeaders();
    return this.http.get(this.hostUrl + '/auth/publicProfile/' + username, this.options).map(res => res.json());
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  constructor(private http: Http) {}
}
