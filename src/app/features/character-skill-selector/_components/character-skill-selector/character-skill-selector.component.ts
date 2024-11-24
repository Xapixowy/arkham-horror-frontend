import { ChangeDetectionStrategy, Component, inject, input, WritableSignal } from '@angular/core';
import { ButtonIconOnlyComponent } from '@Components/button-icon-only/button-icon-only.component';
import { HtmlToTextPipe } from '@Pipes/html-to-text.pipe';
import { NoContentComponent } from '@Components/no-content/no-content.component';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TranslocoPipe } from '@jsverse/transloco';
import { TruncatePipe } from '@Pipes/truncate.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { Skill } from '@Types/characters/skill.type';
import { CharacterSkillModalComponent } from '@Features/character-skill-selector/_components/character-skill-modal/character-skill-modal.component';
import { CharacterSkillSelectorService } from '@Features/character-skill-selector/_services/character-skill-selector.service';

@Component({
  selector: 'app-character-skill-selector',
  standalone: true,
  imports: [
    ButtonIconOnlyComponent,
    HtmlToTextPipe,
    NoContentComponent,
    PrimeTemplate,
    TableModule,
    TranslocoPipe,
    TruncatePipe,
    TooltipModule,
    CharacterSkillModalComponent,
  ],
  providers: [CharacterSkillSelectorService],
  templateUrl: './character-skill-selector.component.html',
  styleUrl: './character-skill-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSkillSelectorComponent {
  private readonly characterSkillSelectorService = inject(CharacterSkillSelectorService);

  readonly isModalShown = input.required<WritableSignal<boolean>>();

  readonly skills = input.required<WritableSignal<Skill[]>>();

  onSkillEdit(skill: Skill): void {
    this.characterSkillSelectorService.showCharacterSkillModal(this.isModalShown(), skill);
  }

  onSkillRemove(skill: Skill): void {
    this.skills().update((skills) => skills.filter((s) => s.name !== skill.name));
  }
}
