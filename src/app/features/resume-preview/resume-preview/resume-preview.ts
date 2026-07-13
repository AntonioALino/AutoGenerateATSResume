import { Component, computed, inject } from '@angular/core';
import { EXTRA_SECTION_FIELDS, ExtraSectionField } from '../../../core/constants/extra-section-fields.constant';
import { EXTRA_SECTION_LABELS } from '../../../core/constants/sections.constant';
import { ExtraSectionKey, ResumeData, SectionKey } from '../../../core/models/resume.model';
import { ResumeFormService } from '../../../core/services/resume-form.service';

function hasContent(key: SectionKey, data: ResumeData): boolean {
  switch (key) {
    case 'summary':
      return data.summary.trim().length > 0;
    case 'experience':
      return data.experience.length > 0;
    case 'education':
      return data.education.length > 0;
    case 'skills':
      return data.skills.length > 0;
    default:
      return data.extraSections[key].length > 0;
  }
}

@Component({
  selector: 'app-resume-preview',
  imports: [],
  templateUrl: './resume-preview.html',
  styleUrl: './resume-preview.css',
})
export class ResumePreview {
  protected readonly resumeForm = inject(ResumeFormService);
  protected readonly extraLabels = EXTRA_SECTION_LABELS;

  protected readonly contactItems = computed<string[]>(() => {
    const info = this.resumeForm.resumeData().personalInfo;
    return [info.email, info.phone, info.location, info.linkedin, info.github].filter(
      (item) => item.trim().length > 0,
    );
  });

  /** Só mostra no preview as seções que já têm algum conteúdo digitado. */
  protected readonly visibleSections = computed<SectionKey[]>(() => {
    const data = this.resumeForm.resumeData();
    return data.sectionOrder.filter((key) => hasContent(key, data));
  });

  /**
   * Cast controlado para permitir acesso por nome de campo dinâmico (vindo de
   * `EXTRA_SECTION_FIELDS`) — as 5 seções extras têm formatos diferentes, então
   * o preview as renderiza genericamente em vez de repetir o mesmo bloco 5 vezes.
   */
  protected extraEntries(key: ExtraSectionKey): Record<string, string>[] {
    return this.resumeForm.resumeData().extraSections[key] as unknown as Record<string, string>[];
  }

  protected extraFields(key: ExtraSectionKey): ExtraSectionField[] {
    return EXTRA_SECTION_FIELDS[key];
  }
}
