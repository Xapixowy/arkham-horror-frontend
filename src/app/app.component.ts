import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslocoPipe} from '@jsverse/transloco';
import {Button} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogsComponent} from '@Components/confirm-dialogs/confirm-dialogs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslocoPipe, Button, ToastModule, ConfirmDialogsComponent],
  template: `
    <router-outlet/>
    <p-toast/>
    <app-confirm-dialogs/>
  `,
})
export class AppComponent {
}
