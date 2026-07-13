import { ExtraSectionKey } from '../models/resume.model';

export interface ExtraSectionField {
  name: string;
  label: string;
  multiline?: boolean;
}

/**
 * As 5 seções extras são estruturalmente o mesmo caso (uma lista de campos de texto),
 * então um único componente genérico as renderiza a partir desta configuração.
 */
export const EXTRA_SECTION_FIELDS: Record<ExtraSectionKey, ExtraSectionField[]> = {
  projects: [
    { name: 'name', label: 'Nome do projeto' },
    { name: 'stack', label: 'Stack utilizada' },
    { name: 'link', label: 'Link' },
    { name: 'impact', label: 'Resultado / impacto' },
  ],
  certifications: [
    { name: 'name', label: 'Nome oficial da certificação' },
    { name: 'institution', label: 'Instituição' },
    { name: 'year', label: 'Ano' },
  ],
  languages: [
    { name: 'name', label: 'Idioma' },
    { name: 'level', label: 'Nível (ex: fluente, avançado)' },
  ],
  volunteering: [
    { name: 'organization', label: 'Organização' },
    { name: 'role', label: 'Função' },
    { name: 'period', label: 'Período' },
    { name: 'description', label: 'Descrição', multiline: true },
  ],
  publications: [
    { name: 'title', label: 'Título' },
    { name: 'venue', label: 'Veículo / publicação' },
    { name: 'year', label: 'Ano' },
    { name: 'link', label: 'Link' },
  ],
};
