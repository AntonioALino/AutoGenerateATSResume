export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationEntry {
  institution: string;
  course: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface ProjectEntry {
  name: string;
  stack: string;
  link: string;
  impact: string;
}

export interface CertificationEntry {
  name: string;
  institution: string;
  year: string;
}

export interface LanguageEntry {
  name: string;
  level: string;
}

export interface VolunteeringEntry {
  organization: string;
  role: string;
  period: string;
  description: string;
}

export interface PublicationEntry {
  title: string;
  venue: string;
  year: string;
  link: string;
}

/** Seções fixas: sempre presentes, sem opção de remover. */
export type FixedSectionKey = 'summary' | 'experience' | 'education' | 'skills';

/** Seções extras: usuário as adiciona sob demanda via "+ Adicionar seção". */
export type ExtraSectionKey =
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'volunteering'
  | 'publications';

/**
 * Une fixas e extras para o reordenamento por drag-and-drop (feature 7).
 * `personalInfo` fica de fora: é sempre o cabeçalho do currículo, não reordenável.
 */
export type SectionKey = FixedSectionKey | ExtraSectionKey;

export interface ExtraSectionEntryMap {
  projects: ProjectEntry;
  certifications: CertificationEntry;
  languages: LanguageEntry;
  volunteering: VolunteeringEntry;
  publications: PublicationEntry;
}

/** Espelha o valor bruto do ResumeForm (o que vem de `form.getRawValue()`/`valueChanges`). */
export interface ResumeFormValue {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  extraSections: {
    [K in ExtraSectionKey]: ExtraSectionEntryMap[K][];
  };
}

/** ResumeFormValue + o estado de UI (quais seções extras estão ativas e em que ordem aparecem). */
export interface ResumeData extends ResumeFormValue {
  /** Chaves das seções extras que o usuário efetivamente adicionou, na ordem em que aparecem. */
  activeExtraSections: ExtraSectionKey[];
  /** Ordem de exibição de todas as seções de conteúdo (fixas + extras ativas). */
  sectionOrder: SectionKey[];
}
