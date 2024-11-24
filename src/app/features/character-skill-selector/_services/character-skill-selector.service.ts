import { Injectable, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CharacterSkillForm } from '@Types/forms/character-skill-form.type';
import { CharacterSkillFormControls } from '@Enums/form-controls/character-skill-form-controls.enum';
import { CHARACTER_SKILL_FORM_VALIDATORS } from '@Configs/form-validators/character-skill-form-validators.config';
import { FormValidationService } from '@Services/form-validation.service';
import { ModalMode } from '@Enums/modal-mode.enum';
import { Skill } from '@Types/characters/skill.type';

@Injectable()
export class CharacterSkillSelectorService {
  readonly characterSkillModalMode = signal<ModalMode>(ModalMode.CREATE);
  readonly characterSkillForm = this.initializeCharacterSkillForm();

  showCharacterSkillModal(isModalShown: WritableSignal<boolean>, skill?: Skill): void {
    this.characterSkillModalMode.set(skill ? ModalMode.EDIT : ModalMode.CREATE);

    if (skill) {
      this.characterSkillForm.patchValue({
        [CharacterSkillFormControls.NAME]: skill.name,
        [CharacterSkillFormControls.DESCRIPTION]: skill.description,
      });
      this.characterSkillForm.controls[CharacterSkillFormControls.NAME].disable();
    } else {
      this.characterSkillForm.controls[CharacterSkillFormControls.NAME].enable();
    }

    isModalShown.set(true);
  }

  hideCharacterSkillModal(isModalShown: WritableSignal<boolean>): void {
    isModalShown.set(false);
    this.resetCharacterSkillForm();
  }

  resetCharacterSkillForm(): void {
    this.characterSkillModalMode.set(ModalMode.CREATE);
    this.characterSkillForm.controls[CharacterSkillFormControls.NAME].enable();
    this.characterSkillForm.reset();
    this.characterSkillForm.markAsPristine();
  }

  async submitCharacterSkillForm(skills: WritableSignal<Skill[]>): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (FormValidationService.isFormInvalid(this.characterSkillForm)) {
        return resolve(false);
      }

      if (this.characterSkillModalMode() === ModalMode.CREATE) {
        skills.update((skills) => [
          ...skills,
          {
            name: this.characterSkillForm.controls[CharacterSkillFormControls.NAME].value as string,
            description: this.characterSkillForm.controls[CharacterSkillFormControls.DESCRIPTION].value as string,
          },
        ]);
      } else {
        skills.update((skills) => {
          const updatedSkills = [...skills];
          const skillIndex = updatedSkills.findIndex(
            (s) => s.name === this.characterSkillForm.controls[CharacterSkillFormControls.NAME].value,
          );
          if (skillIndex >= 0) {
            updatedSkills[skillIndex] = {
              name: this.characterSkillForm.controls[CharacterSkillFormControls.NAME].value as string,
              description: this.characterSkillForm.controls[CharacterSkillFormControls.DESCRIPTION].value as string,
            };
          }
          return updatedSkills;
        });
      }

      this.resetCharacterSkillForm();
      resolve(true);
    });
  }

  private initializeCharacterSkillForm(): FormGroup<CharacterSkillForm> {
    return new FormGroup<CharacterSkillForm>({
      [CharacterSkillFormControls.NAME]: new FormControl(null, {
        validators: CHARACTER_SKILL_FORM_VALIDATORS[CharacterSkillFormControls.NAME],
      }),
      [CharacterSkillFormControls.DESCRIPTION]: new FormControl(null, {
        validators: CHARACTER_SKILL_FORM_VALIDATORS[CharacterSkillFormControls.DESCRIPTION],
      }),
    });
  }
}
