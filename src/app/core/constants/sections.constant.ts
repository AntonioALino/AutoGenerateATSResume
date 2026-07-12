import { ExtraSectionKey, FixedSectionKey } from '../models/resume.model';

export interface ExtraSectionDefinition {
  key: ExtraSectionKey;
  label: string;
}

export const FIXED_SECTION_ORDER: FixedSectionKey[] = ['summary', 'experience', 'education', 'skills'];

export const FIXED_SECTION_LABELS: Record<FixedSectionKey, string> = {
  summary: 'Resumo',
  experience: 'Experiência Profissional',
  education: 'Formação Acadêmica',
  skills: 'Habilidades Técnicas',
};

export const EXTRA_SECTION_DEFINITIONS: ExtraSectionDefinition[] = [
  { key: 'projects', label: 'Projetos' },
  { key: 'certifications', label: 'Certificações' },
  { key: 'languages', label: 'Idiomas' },
  { key: 'volunteering', label: 'Voluntariado' },
  { key: 'publications', label: 'Publicações' },
];

export const EXTRA_SECTION_LABELS: Record<ExtraSectionKey, string> = EXTRA_SECTION_DEFINITIONS.reduce(
  (labels, section) => ({ ...labels, [section.key]: section.label }),
  {} as Record<ExtraSectionKey, string>,
);
