import { Component, computed, inject, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExtraSectionField, EXTRA_SECTION_FIELDS } from '../../../../core/constants/extra-section-fields.constant';
import { ExtraSectionKey } from '../../../../core/models/resume.model';
import { ResumeFormService } from '../../../../core/services/resume-form.service';

@Component({
  selector: 'app-extra-section-list',
  imports: [ReactiveFormsModule],
  templateUrl: './extra-section-list.html',
  styleUrl: './extra-section-list.css',
})
export class ExtraSectionList {
  readonly sectionKey = input.required<ExtraSectionKey>();

  protected readonly resumeForm = inject(ResumeFormService);

  protected readonly fields = computed<ExtraSectionField[]>(() => EXTRA_SECTION_FIELDS[this.sectionKey()]);

  /**
   * As 5 seções extras têm FormArrays de formatos diferentes; como este componente é
   * genérico (trabalha por nome de campo em runtime, vindo de `fields()`), tipamos a
   * saída como `FormGroup<any>` — a segurança de tipos aqui vem da configuração em
   * `EXTRA_SECTION_FIELDS`, não do compilador.
   */
  protected readonly entries = computed<FormArray<FormGroup<any>>>(
    () => this.resumeForm.form.controls.extraSections.controls[this.sectionKey()] as unknown as FormArray<FormGroup<any>>,
  );

  protected controlFor(entry: FormGroup<any>, name: string): FormControl<string> {
    return entry.controls[name] as FormControl<string>;
  }

  protected addEntry(): void {
    this.resumeForm.addExtraEntry(this.sectionKey());
  }

  protected removeEntry(index: number): void {
    this.resumeForm.removeExtraEntry(this.sectionKey(), index);
  }
}
