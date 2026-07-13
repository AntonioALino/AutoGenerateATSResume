import { Component, computed, inject } from '@angular/core';
import { EXTRA_SECTION_DEFINITIONS, ExtraSectionDefinition } from '../../../../core/constants/sections.constant';
import { ResumeFormService } from '../../../../core/services/resume-form.service';

@Component({
  selector: 'app-extra-section-picker',
  imports: [],
  templateUrl: './extra-section-picker.html',
  styleUrl: './extra-section-picker.css',
})
export class ExtraSectionPicker {
  protected readonly resumeForm = inject(ResumeFormService);

  protected readonly availableSections = computed<ExtraSectionDefinition[]>(() =>
    EXTRA_SECTION_DEFINITIONS.filter((section) => !this.resumeForm.activeExtraSections().includes(section.key)),
  );
}
