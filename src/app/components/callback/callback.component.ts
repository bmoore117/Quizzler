import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.authService.handleAuthentication();
    } else {
      const redirect = sessionStorage.getItem('redirect');
      this.router.navigate([redirect]);
    }
  }
}
