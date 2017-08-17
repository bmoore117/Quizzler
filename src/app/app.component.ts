import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'app';

  leftRoute: string = undefined;
  rightRoute: string = undefined;

  leftText: string = undefined;
  rightText: string = undefined;

  constructor(private authService: AuthService, private router: Router) {
    /* authService.isLoggedIn.subscribe((value: boolean) => {
      console.log("Hitting subscribe");
      if(!value) {
        console.log('Not value');
        this.leftRoute = '/login';
        this.leftText = 'Login';

        this.rightRoute = '/register';
        this.rightText = 'Register';
      } else {
        console.log('value');
        this.leftRoute = undefined;
        this.leftText = 'Hi, ' + authService.getLoggedInUser();

        this.rightRoute = undefined;
        this.rightText = 'Logout';
      }
    }) */
  }

  logoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
