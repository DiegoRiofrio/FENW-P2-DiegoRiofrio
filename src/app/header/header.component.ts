import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  UserLogged$: Observable<string>;
  isLoggedOut$: Observable<boolean>;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    this.UserLogged$ = this.authenticationService.UserLogged;
    this.isLoggedOut$ = this.authenticationService.isLoggedOut;
  }

}
