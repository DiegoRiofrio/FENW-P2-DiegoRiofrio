import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../model/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseurl = 'http://fenw.etsisi.upm.es:5555';

  constructor(private http: HttpClient) {
  }

  postUser(newuser) {
    return this.http.post(this.baseurl + '/users/', newuser);
  }

  getUserByUsername(username) {
    if (username) {
      console.log('Token header userByUsername : ' + sessionStorage.getItem('CURRENT_TOKEN'));
      return this.http.get<User>(this.baseurl + '/users/' + username, {
        observe: 'response'
      });
    }
  }

}
