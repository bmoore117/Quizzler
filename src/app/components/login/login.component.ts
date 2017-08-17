import { Component, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private authService: AuthService) {
    authService.handleAuthentication();
  }
}
