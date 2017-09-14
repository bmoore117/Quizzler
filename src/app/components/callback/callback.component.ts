import { Component, Injectable, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.handleAuthentication();
  }
}
