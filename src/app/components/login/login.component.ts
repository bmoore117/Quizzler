import { Component, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  previousUrl: string;

  constructor(private authService: AuthService, private router: Router) {}

  // Bound fields in template
  username: String = '';
  password: String = '';

  doLogin(event) {
    console.log('button pressed');
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate([this.authService.redirectUrl]);
      } // TODO else show incorrect username / password notification
    });
  }
}
