import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ExtraSectionKey } from '../models/resume.model';

export type PersonalInfoForm = FormGroup<{
  fullName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  location: FormControl<string>;
  linkedin: FormControl<string>;
  github: FormControl<string>;
}>;

export type ExperienceEntryForm = FormGroup<{
  company: FormControl<string>;
  role: FormControl<string>;
  startDate: FormControl<string>;
  endDate: FormControl<string>;
  current: FormControl<boolean>;
  bullets: FormArray<FormControl<string>>;
}>;

export type EducationEntryForm = FormGroup<{
  institution: FormControl<string>;
  course: FormControl<string>;
  startDate: FormControl<string>;
  endDate: FormControl<string>;
  current: FormControl<boolean>;
}>;

export type ProjectEntryForm = FormGroup<{
  name: FormControl<string>;
  stack: FormControl<string>;
  link: FormControl<string>;
  impact: FormControl<string>;
}>;

export type CertificationEntryForm = FormGroup<{
  name: FormControl<string>;
  institution: FormControl<string>;
  year: FormControl<string>;
}>;

export type LanguageEntryForm = FormGroup<{
  name: FormControl<string>;
  level: FormControl<string>;
}>;

export type VolunteeringEntryForm = FormGroup<{
  organization: FormControl<string>;
  role: FormControl<string>;
  period: FormControl<string>;
  description: FormControl<string>;
}>;

export type PublicationEntryForm = FormGroup<{
  title: FormControl<string>;
  venue: FormControl<string>;
  year: FormControl<string>;
  link: FormControl<string>;
}>;

export interface ExtraSectionFormMap {
  projects: ProjectEntryForm;
  certifications: CertificationEntryForm;
  languages: LanguageEntryForm;
  volunteering: VolunteeringEntryForm;
  publications: PublicationEntryForm;
}

export type ExtraSectionsForm = FormGroup<{
  [K in ExtraSectionKey]: FormArray<ExtraSectionFormMap[K]>;
}>;

export type ResumeFormGroup = FormGroup<{
  personalInfo: PersonalInfoForm;
  summary: FormControl<string>;
  experience: FormArray<ExperienceEntryForm>;
  education: FormArray<EducationEntryForm>;
  skills: FormArray<FormControl<string>>;
  extraSections: ExtraSectionsForm;
}>;
