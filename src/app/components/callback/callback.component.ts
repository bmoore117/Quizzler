import { Component, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './callback.component.html'
})
export class CallbackComponent {
  constructor(private authService: AuthService) {}
}
