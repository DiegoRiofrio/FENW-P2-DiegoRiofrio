import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  submitted = false;
  loginform: FormGroup;
  AlertaUsuario = false;
  AlertaAutenticacion = false;
  path: string;

  doLogin(data: FormGroup) {
    this.submitted = true;
    console.log(this.formFields.nospam.value);

    if (this.loginform.invalid) {
      return;
    }

    this.authenticationService.login(this.formFields.username.value, this.formFields.password.value)
      .subscribe(response => {
        sessionStorage.setItem('CURRENT_USER', this.formFields.username.value);
        console.log('Login realizado con éxito. Usuario ' + this.formFields.username.value + ' logado correctamente');
        this.authenticationService.loggedIn.next(true);
        this.authenticationService.userLoggedIn.next(this.formFields.username.value);
        this.authenticationService.loggedOut.next(false);
        this.router.navigateByUrl(this.path);
      }, error => {
        console.log('Error login. Usuario ' + this.formFields.username.value + ' no registrado');
        this.AlertaUsuario = true;
        this.AlertaAutenticacion = true;
      });
  }



  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nospam: ['', [Validators.minLength(0), Validators.maxLength(0)]]
    });

    this.authenticationService.logout();

    this.path = this.route.snapshot.queryParams['path'] || '/inicio';
  }
  get formFields() {
    return this.loginform.controls;
  }
}
