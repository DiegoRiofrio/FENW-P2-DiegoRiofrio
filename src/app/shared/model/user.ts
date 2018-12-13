export class User {
  username: string;
  email: string;
  password: string;
  rePassword: string;
  birthDate: number;

  constructor(username: string, email: string, password: string, rePassword: string, birthDate: number) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.rePassword = rePassword;
    this.birthDate = birthDate;
  }

}
