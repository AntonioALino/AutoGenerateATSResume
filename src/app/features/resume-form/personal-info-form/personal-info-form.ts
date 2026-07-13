import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResumeFormService } from '../../../core/services/resume-form.service';

@Component({
  selector: 'app-personal-info-form',
  imports: [ReactiveFormsModule],
  templateUrl: './personal-info-form.html',
  styleUrl: './personal-info-form.css',
})
export class PersonalInfoForm {
  protected readonly resumeForm = inject(ResumeFormService);
}
