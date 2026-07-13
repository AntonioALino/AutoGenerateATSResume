import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResumeFormService } from '../../../core/services/resume-form.service';

@Component({
  selector: 'app-experience-form',
  imports: [ReactiveFormsModule],
  templateUrl: './experience-form.html',
  styleUrl: './experience-form.css',
})
export class ExperienceForm {
  protected readonly resumeForm = inject(ResumeFormService);
}
