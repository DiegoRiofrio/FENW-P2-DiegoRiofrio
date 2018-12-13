import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../shared/services/user.service';
import {User} from '../shared/model/user';
import {UsernameValidator} from '../shared/username';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public max = new Date(2018, 12);
  registryForm: FormGroup;
  submitted = false;
  newuser: User;
  alertaRegistroNuevoUsuario = false;
  path: string;

  doRegistro(data: FormGroup) {
    this.submitted = true;
    if (this.registryForm.invalid) {
      return;
    } else if (this.formFields.password.value === this.formFields.repassword.value) {
      this.newuser = new User(this.formFields.username.value, this.formFields.password.value, this.formFields.repassword.value,
        this.formFields.email.value, this.formFields.birthdate.value);
    } else {
      this.toastrService.error('Error: las claves no coinciden', 'Claves incorrectas');
      return;
    }
    this.userService.postUser(this.newuser).subscribe(response => {
      console.log('Nuevo usuario registrado correctamente.');

      this.toastrService.success('Usuario ' + this.newuser.username + ' registrado correctamente', 'Registro correcto!');

      this.router.navigateByUrl(this.path);
    }, error => {
      console.log('Error en alta de un nuevo usuario.');
      this.toastrService.error('Error en el alta de un nuevo usuario', 'Registro no realizado!');
      this.alertaRegistroNuevoUsuario = true;
      return;
    });
  }

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute,
              private router: Router, private usernameValidator: UsernameValidator, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.registryForm = this.fb.group({
      username: ['', Validators.required, this.usernameValidator.checkUsername.bind(this.usernameValidator)],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', ''],
      nospam: ['', [Validators.minLength(0), Validators.maxLength(0)]]
    });

    this.path = this.route.snapshot.queryParams['login'] || '/inicio';

  }

  get formFields() {
    return this.registryForm.controls;
  }


}
