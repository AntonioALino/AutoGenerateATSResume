import { Injectable, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { ExtraSectionEntryMap, ExtraSectionKey, ResumeData, SectionKey } from '../models/resume.model';
import { FIXED_SECTION_ORDER } from '../constants/sections.constant';
import {
  EXTRA_SECTION_ENTRY_FACTORIES,
  createEducationEntryForm,
  createExperienceEntryForm,
  createResumeForm,
} from '../forms/resume-form.factory';
import { ResumeFormGroup } from '../forms/resume-form.types';

@Injectable({ providedIn: 'root' })
export class ResumeFormService {
  readonly form: ResumeFormGroup = createResumeForm();

  /** Seções extras que o usuário adicionou, na ordem em que foram adicionadas. */
  readonly activeExtraSections = signal<ExtraSectionKey[]>([]);

  /** Ordem de exibição das seções de conteúdo no preview (drag-and-drop altera isto). */
  readonly sectionOrder = signal<SectionKey[]>([...FIXED_SECTION_ORDER]);

  /**
   * Valor do formulário, atualizado a cada digitação — sem debounce, é a base do preview em tempo real.
   * Usa `getRawValue()` a cada emissão porque `valueChanges`/`.value` tipam campos aninhados como
   * `Partial<T>` (reserva para controles desabilitados), o que não reflete o formato real do dado.
   */
  private readonly value = toSignal(this.form.valueChanges.pipe(map(() => this.form.getRawValue())), {
    initialValue: this.form.getRawValue(),
  });

  /** Snapshot completo do currículo (dados do form + estado de UI das seções) para o preview e exportações. */
  readonly resumeData = computed<ResumeData>(() => ({
    ...this.value(),
    activeExtraSections: this.activeExtraSections(),
    sectionOrder: this.sectionOrder(),
  }));

  addExtraSection(key: ExtraSectionKey): void {
    if (this.activeExtraSections().includes(key)) {
      return;
    }
    this.activeExtraSections.update((sections) => [...sections, key]);
    this.sectionOrder.update((order) => [...order, key]);
    this.addExtraEntry(key);
  }

  removeExtraSection(key: ExtraSectionKey): void {
    this.activeExtraSections.update((sections) => sections.filter((section) => section !== key));
    this.sectionOrder.update((order) => order.filter((section) => section !== key));
    this.form.controls.extraSections.controls[key].clear();
  }

  addExtraEntry<K extends ExtraSectionKey>(key: K, value?: Partial<ExtraSectionEntryMap[K]>): void {
    const factory = EXTRA_SECTION_ENTRY_FACTORIES[key];
    const array = this.form.controls.extraSections.controls[key];
    array.push(factory(value));
  }

  removeExtraEntry(key: ExtraSectionKey, index: number): void {
    this.form.controls.extraSections.controls[key].removeAt(index);
  }

  addExperience(): void {
    this.form.controls.experience.push(createExperienceEntryForm());
  }

  removeExperience(index: number): void {
    this.form.controls.experience.removeAt(index);
  }

  addBullet(experienceIndex: number): void {
    this.form.controls.experience.at(experienceIndex).controls.bullets.push(new FormControl('', { nonNullable: true }));
  }

  removeBullet(experienceIndex: number, bulletIndex: number): void {
    this.form.controls.experience.at(experienceIndex).controls.bullets.removeAt(bulletIndex);
  }

  addEducation(): void {
    this.form.controls.education.push(createEducationEntryForm());
  }

  removeEducation(index: number): void {
    this.form.controls.education.removeAt(index);
  }

  addSkill(skill: string): void {
    const trimmed = skill.trim();
    if (!trimmed) {
      return;
    }
    this.form.controls.skills.push(new FormControl(trimmed, { nonNullable: true }));
  }

  removeSkill(index: number): void {
    this.form.controls.skills.removeAt(index);
  }

  reorderSections(previousIndex: number, currentIndex: number): void {
    this.sectionOrder.update((order) => {
      const next = [...order];
      const [moved] = next.splice(previousIndex, 1);
      next.splice(currentIndex, 0, moved);
      return next;
    });
  }
}
