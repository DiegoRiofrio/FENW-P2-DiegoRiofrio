import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedIn = new BehaviorSubject<boolean>(false);
  userLoggedIn = new BehaviorSubject<string>('');
  loggedOut = new BehaviorSubject<boolean>(true);

  private baseurl = 'http://fenw.etsisi.upm.es:5555';

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isLoggedOut() {
    return this.loggedOut.asObservable();
  }

  get UserLogged () {
    return this.userLoggedIn.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {
  }
    login(username: string, password: string) {
      return this.http.get(this.baseurl + '/users/login' + '?username=' + username + '&password=' + password);
  }

  logout() {
    this.removeDataUserSession();
    this.loggedIn.next(false);
    this.loggedOut.next(true);
    this.userLoggedIn.next('');

    this.router.navigate(['login']);
    console.log('Logout de la app');
  }

  saveTokenInSession(token: string) {
    sessionStorage.setItem('CURRENT_TOKEN', token);
    console.log('Token saveTokenInSession = ' + sessionStorage.getItem('CURRENT_TOKEN'));
  }
  getTokenInSession(): string {
    return sessionStorage.getItem('CURRENT_TOKEN');
  }
  getCurrentUserInSession(): string {
    return sessionStorage.getItem('CURRENT_USER');
  }
  removeDataUserSession() {
    sessionStorage.removeItem('CURRENT_TOKEN');
    sessionStorage.removeItem('CURRENT_USER');
    sessionStorage.clear();
  }
}
