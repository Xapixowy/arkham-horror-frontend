import {Component} from '@angular/core';
import {AuthCardComponent} from '@Components/auth-card/auth-card.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AuthCardComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
