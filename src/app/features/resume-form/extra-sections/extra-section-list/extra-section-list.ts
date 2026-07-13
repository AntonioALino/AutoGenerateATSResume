import { Component, computed, inject, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExtraSectionField, EXTRA_SECTION_FIELDS } from '../../../../core/constants/extra-section-fields.constant';
import { ExtraSectionKey } from '../../../../core/models/resume.model';
import { ResumeFormService } from '../../../../core/services/resume-form.service';

/**
 * As 5 seções extras têm FormGroups de formatos diferentes, mas todos os campos são
 * `FormControl<string>` — este alias descreve exatamente essa forma comum, sem recorrer a `any`.
 */
type ExtraEntryFormGroup = FormGroup<Record<string, FormControl<string>>>;

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

  protected readonly entries = computed<FormArray<ExtraEntryFormGroup>>(
    () =>
      this.resumeForm.form.controls.extraSections.controls[this.sectionKey()] as unknown as FormArray<ExtraEntryFormGroup>,
  );

  protected controlFor(entry: ExtraEntryFormGroup, name: string): FormControl<string> {
    return entry.controls[name];
  }

  protected fieldId(field: ExtraSectionField, entryIndex: number): string {
    return `${this.sectionKey()}-${field.name}-${entryIndex}`;
  }

  protected addEntry(): void {
    this.resumeForm.addExtraEntry(this.sectionKey());
  }

  protected removeEntry(index: number): void {
    this.resumeForm.removeExtraEntry(this.sectionKey(), index);
  }
}
