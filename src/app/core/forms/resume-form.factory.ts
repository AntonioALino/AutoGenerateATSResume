import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
  ExtraSectionEntryMap,
  ExtraSectionKey,
  LanguageEntry,
  PersonalInfo,
  ProjectEntry,
  PublicationEntry,
  VolunteeringEntry,
} from '../models/resume.model';
import {
  CertificationEntryForm,
  EducationEntryForm,
  ExperienceEntryForm,
  ExtraSectionFormMap,
  ExtraSectionsForm,
  LanguageEntryForm,
  PersonalInfoForm,
  ProjectEntryForm,
  PublicationEntryForm,
  ResumeFormGroup,
  VolunteeringEntryForm,
} from './resume-form.types';

function textControl(value = ''): FormControl<string> {
  return new FormControl(value, { nonNullable: true });
}

function requiredTextControl(value = ''): FormControl<string> {
  return new FormControl(value, { nonNullable: true, validators: [Validators.required] });
}

export function createPersonalInfoForm(value?: Partial<PersonalInfo>): PersonalInfoForm {
  return new FormGroup({
    fullName: requiredTextControl(value?.fullName),
    email: new FormControl(value?.email ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: textControl(value?.phone),
    location: textControl(value?.location),
    linkedin: textControl(value?.linkedin),
    github: textControl(value?.github),
  });
}

/** Enquanto "emprego/formação atual" estiver marcado, a data de fim não faz sentido — mantém desabilitada. */
function disableEndDateWhileCurrent(group: { controls: { current: FormControl<boolean>; endDate: FormControl<string> } }): void {
  group.controls.current.valueChanges.subscribe((current) => {
    if (current) {
      group.controls.endDate.disable();
    } else {
      group.controls.endDate.enable();
    }
  });
  if (group.controls.current.value) {
    group.controls.endDate.disable();
  }
}

export function createExperienceEntryForm(value?: Partial<ExperienceEntry>): ExperienceEntryForm {
  const group = new FormGroup({
    company: requiredTextControl(value?.company),
    role: requiredTextControl(value?.role),
    startDate: textControl(value?.startDate),
    endDate: textControl(value?.endDate),
    current: new FormControl(value?.current ?? false, { nonNullable: true }),
    bullets: new FormArray((value?.bullets ?? ['']).map((bullet) => textControl(bullet))),
  });
  disableEndDateWhileCurrent(group);
  return group;
}

export function createEducationEntryForm(value?: Partial<EducationEntry>): EducationEntryForm {
  const group = new FormGroup({
    institution: requiredTextControl(value?.institution),
    course: requiredTextControl(value?.course),
    startDate: textControl(value?.startDate),
    endDate: textControl(value?.endDate),
    current: new FormControl(value?.current ?? false, { nonNullable: true }),
  });
  disableEndDateWhileCurrent(group);
  return group;
}

export function createProjectEntryForm(value?: Partial<ProjectEntry>): ProjectEntryForm {
  return new FormGroup({
    name: requiredTextControl(value?.name),
    stack: textControl(value?.stack),
    link: textControl(value?.link),
    impact: textControl(value?.impact),
  });
}

export function createCertificationEntryForm(value?: Partial<CertificationEntry>): CertificationEntryForm {
  return new FormGroup({
    name: requiredTextControl(value?.name),
    institution: textControl(value?.institution),
    year: textControl(value?.year),
  });
}

export function createLanguageEntryForm(value?: Partial<LanguageEntry>): LanguageEntryForm {
  return new FormGroup({
    name: requiredTextControl(value?.name),
    level: textControl(value?.level),
  });
}

export function createVolunteeringEntryForm(value?: Partial<VolunteeringEntry>): VolunteeringEntryForm {
  return new FormGroup({
    organization: requiredTextControl(value?.organization),
    role: textControl(value?.role),
    period: textControl(value?.period),
    description: textControl(value?.description),
  });
}

export function createPublicationEntryForm(value?: Partial<PublicationEntry>): PublicationEntryForm {
  return new FormGroup({
    title: requiredTextControl(value?.title),
    venue: textControl(value?.venue),
    year: textControl(value?.year),
    link: textControl(value?.link),
  });
}

/** Permite criar (e adicionar) entradas de qualquer seção extra sem um switch por tipo. */
export const EXTRA_SECTION_ENTRY_FACTORIES: {
  [K in ExtraSectionKey]: (value?: Partial<ExtraSectionEntryMap[K]>) => ExtraSectionFormMap[K];
} = {
  projects: createProjectEntryForm,
  certifications: createCertificationEntryForm,
  languages: createLanguageEntryForm,
  volunteering: createVolunteeringEntryForm,
  publications: createPublicationEntryForm,
};

function createExtraSectionsForm(): ExtraSectionsForm {
  return new FormGroup({
    projects: new FormArray<ProjectEntryForm>([]),
    certifications: new FormArray<CertificationEntryForm>([]),
    languages: new FormArray<LanguageEntryForm>([]),
    volunteering: new FormArray<VolunteeringEntryForm>([]),
    publications: new FormArray<PublicationEntryForm>([]),
  });
}

export function createResumeForm(): ResumeFormGroup {
  return new FormGroup({
    personalInfo: createPersonalInfoForm(),
    summary: textControl(),
    experience: new FormArray<ExperienceEntryForm>([createExperienceEntryForm()]),
    education: new FormArray<EducationEntryForm>([createEducationEntryForm()]),
    skills: new FormArray<FormControl<string>>([]),
    extraSections: createExtraSectionsForm(),
  });
}
