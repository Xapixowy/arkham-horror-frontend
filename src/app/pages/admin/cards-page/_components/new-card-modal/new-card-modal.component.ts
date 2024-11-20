import { Component, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CardsPageService } from '@Pages/admin/cards-page/cards-page.service';
import { Button } from 'primeng/button';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-new-card-modal',
  standalone: true,
  imports: [DialogModule, Button, TranslocoPipe],
  templateUrl: './new-card-modal.component.html',
  styleUrl: './new-card-modal.component.scss',
})
export class NewCardModalComponent {
  private readonly cardsPageService = inject(CardsPageService);

  readonly isNewCardModalShown = this.cardsPageService.isNewCardModalShown;

  onSave() {
    console.log('onSave');
  }

  onCancel() {
    console.log('onCancel');
  }
}
