import { Component, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  // Bound fields in template
  username: String = '';
  password: String = '';

  doLogin(event) {
    console.log('button pressed');
    this.authService.login(this.username, this.password).subscribe();
  }
}
