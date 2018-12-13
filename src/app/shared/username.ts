import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from './services/user.service';

@Injectable()
export class UsernameValidator {

  debouncer: any;

  constructor(public userService: UserService) {

  }

  checkUsername(control: FormControl): any {

    console.log('checkUsername');

    clearTimeout(this.debouncer);

    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {

        this.userService.getUserByUsername(control.value).subscribe(
          (res) => {
            if (res.ok) {
              resolve({'usernameInUse': true});
            }
          },
          (err) => {
            resolve(null);
          });

      }, 1000);

    });
  }
}
