import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '@Services/local-storage.service';
import { Player } from '@Models/player.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterPageService {
  private readonly localStorageService = inject(LocalStorageService);

  readonly player = signal<Player | null>(null);

  constructor() {
    this.listenToLocalStoragePlayerChanges();
  }

  private listenToLocalStoragePlayerChanges(): void {
    this.localStorageService.playerSubject.subscribe((player) => {
      this.player.set(player);
    });
  }
}
