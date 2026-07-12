import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResumeFormService } from '../../../core/services/resume-form.service';

@Component({
  selector: 'app-education-form',
  imports: [ReactiveFormsModule],
  templateUrl: './education-form.html',
  styleUrl: './education-form.css',
})
export class EducationForm {
  protected readonly resumeForm = inject(ResumeFormService);
}
