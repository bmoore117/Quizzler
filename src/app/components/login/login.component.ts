import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username: String = '';
  password: String = '';

  doLogin(event) {
    console.log('Username: ' + this.username + ', password: ' + this.password);
  }
}
