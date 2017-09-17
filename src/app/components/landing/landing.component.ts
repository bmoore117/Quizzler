import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
@Injectable()
export class LandingComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home/quiz']);
    }
  }

  showPopup(isLogin: boolean) {
    if (isLogin) {
      this.authService.setRedirect('home/quiz');
      this.authService.login({initialScreen: 'login'});
    } else {
      this.authService.setRedirect('home/quiz');
      this.authService.login({initialScreen: 'signUp'});
    }
  }
}
