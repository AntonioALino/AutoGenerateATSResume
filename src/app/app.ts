import { Component } from '@angular/core';
import { ExportPanel } from './features/export/export-panel/export-panel';
import { ResumeForm } from './features/resume-form/resume-form/resume-form';
import { ResumePreview } from './features/resume-preview/resume-preview/resume-preview';

@Component({
  selector: 'app-root',
  imports: [ResumeForm, ResumePreview, ExportPanel],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
