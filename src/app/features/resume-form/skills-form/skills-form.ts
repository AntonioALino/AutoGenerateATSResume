import { Component, inject } from '@angular/core';
import { ResumeFormService } from '../../../core/services/resume-form.service';

@Component({
  selector: 'app-skills-form',
  imports: [],
  templateUrl: './skills-form.html',
  styleUrl: './skills-form.css',
})
export class SkillsForm {
  protected readonly resumeForm = inject(ResumeFormService);
}
