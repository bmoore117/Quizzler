import { AuthService } from '../../services/auth.service';
import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent {

  leftRoute: string = undefined;
  rightRoute: string = undefined;

  leftText: string = undefined;
  rightText: string = undefined;

  constructor(private authService: AuthService) {
    authService.isLoggedIn.subscribe((value: boolean) => {
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
        
        this.rightRoute = '/';
        this.rightText = 'Logout';
      }
    })
  }


}
