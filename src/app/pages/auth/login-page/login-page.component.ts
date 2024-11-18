import { Component } from '@angular/core';
import { AuthCardComponent } from '@Components/auth-card/auth-card.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AuthCardComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
