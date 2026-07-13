import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResumeFormService } from '../../../core/services/resume-form.service';

@Component({
  selector: 'app-summary-form',
  imports: [ReactiveFormsModule],
  templateUrl: './summary-form.html',
  styleUrl: './summary-form.css',
})
export class SummaryForm {
  protected readonly resumeForm = inject(ResumeFormService);
}
