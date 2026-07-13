import { Component, inject } from '@angular/core';
import { EXTRA_SECTION_LABELS } from '../../../core/constants/sections.constant';
import { ResumeFormService } from '../../../core/services/resume-form.service';
import { EducationForm } from '../education-form/education-form';
import { ExperienceForm } from '../experience-form/experience-form';
import { ExtraSectionList } from '../extra-sections/extra-section-list/extra-section-list';
import { ExtraSectionPicker } from '../extra-sections/extra-section-picker/extra-section-picker';
import { PersonalInfoForm } from '../personal-info-form/personal-info-form';
import { SkillsForm } from '../skills-form/skills-form';
import { SummaryForm } from '../summary-form/summary-form';

@Component({
  selector: 'app-resume-form',
  imports: [
    PersonalInfoForm,
    SummaryForm,
    ExperienceForm,
    EducationForm,
    SkillsForm,
    ExtraSectionList,
    ExtraSectionPicker,
  ],
  templateUrl: './resume-form.html',
  styleUrl: './resume-form.css',
})
export class ResumeForm {
  protected readonly resumeForm = inject(ResumeFormService);
  protected readonly extraLabels = EXTRA_SECTION_LABELS;
}
