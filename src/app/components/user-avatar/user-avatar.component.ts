import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { User } from '@Models/user.model';

@Component({
  selector: 'app-users-avatar',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  readonly size = input<'normal' | 'large' | 'xlarge'>('normal');
  readonly user = input.required<User>();

  readonly classes = computed(() => ({
    'user-avatar--normal': this.size() === 'normal',
    'user-avatar--large': this.size() === 'large',
    'user-avatar--xlarge': this.size() === 'xlarge',
  }));

  readonly label = computed(() => (this.user().name.length ? this.user().name[0] : this.user().email[0]));
}
