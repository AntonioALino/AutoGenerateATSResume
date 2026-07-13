import { TestBed } from '@angular/core/testing';
import { ResumeFormService } from './resume-form.service';

describe('ResumeFormService', () => {
  let service: ResumeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeFormService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('estado inicial', () => {
    it('deve iniciar sem seções extras ativas', () => {
      expect(service.activeExtraSections()).toEqual([]);
    });

    it('deve iniciar com a ordem fixa de seções definida', () => {
      expect(service.sectionOrder().length).toBeGreaterThan(0);
    });
  });

  describe('addExtraSection', () => {
    it('deve adicionar a seção à lista de ativas e à ordem de exibição', () => {
      service.addExtraSection('projects');

      expect(service.activeExtraSections()).toContain('projects');
      expect(service.sectionOrder()).toContain('projects');
    });

    it('deve criar uma entrada inicial no FormArray da seção', () => {
      service.addExtraSection('projects');

      expect(service.form.controls.extraSections.controls.projects.length).toBe(1);
    });

    it('não deve duplicar a seção se ela já estiver ativa', () => {
      service.addExtraSection('projects');
      service.addExtraSection('projects');

      const ocorrencias = service.activeExtraSections().filter((s) => s === 'projects');
      expect(ocorrencias.length).toBe(1);
    });

    it('não deve duplicar a seção na ordem de exibição se já estiver ativa', () => {
      service.addExtraSection('projects');
      service.addExtraSection('projects');

      const ocorrencias = service.sectionOrder().filter((s) => s === 'projects');
      expect(ocorrencias.length).toBe(1);
    });
  });

  describe('removeExtraSection', () => {
    it('deve remover a seção da lista de ativas', () => {
      service.addExtraSection('projects');
      service.removeExtraSection('projects');

      expect(service.activeExtraSections()).not.toContain('projects');
    });

    it('deve remover a seção da ordem de exibição', () => {
      service.addExtraSection('projects');
      service.removeExtraSection('projects');

      expect(service.sectionOrder()).not.toContain('projects');
    });

    it('deve limpar todas as entradas do FormArray da seção removida', () => {
      service.addExtraSection('projects');
      service.addExtraEntry('projects');
      service.removeExtraSection('projects');

      expect(service.form.controls.extraSections.controls.projects.length).toBe(0);
    });
  });

  describe('addExtraEntry / removeExtraEntry', () => {
    it('deve adicionar uma entrada ao FormArray da seção informada', () => {
      service.addExtraEntry('projects');

      expect(service.form.controls.extraSections.controls.projects.length).toBe(1);
    });

    it('deve adicionar múltiplas entradas de forma acumulativa', () => {
      service.addExtraEntry('projects');
      service.addExtraEntry('projects');

      expect(service.form.controls.extraSections.controls.projects.length).toBe(2);
    });

    it('deve remover apenas a entrada do índice informado', () => {
      service.addExtraEntry('projects');
      service.addExtraEntry('projects');
      service.removeExtraEntry('projects', 0);

      expect(service.form.controls.extraSections.controls.projects.length).toBe(1);
    });
  });

  describe('experiência profissional', () => {
    it('deve adicionar uma nova experiência', () => {
      const antes = service.form.controls.experience.length;
      service.addExperience();

      expect(service.form.controls.experience.length).toBe(antes + 1);
    });

    it('deve remover a experiência do índice informado', () => {
      const antes = service.form.controls.experience.length;
      service.addExperience();
      service.addExperience();
      service.removeExperience(0);

      expect(service.form.controls.experience.length).toBe(antes + 1);
    });

    it('deve adicionar uma bullet à experiência informada', () => {
      service.addExperience();
      const antes = service.form.controls.experience.at(0).controls.bullets.length;
      service.addBullet(0);

      expect(service.form.controls.experience.at(0).controls.bullets.length).toBe(antes + 1);
    });

    it('deve remover a bullet do índice informado dentro da experiência', () => {
      const antes = service.form.controls.experience.at(0).controls.bullets.length;
      service.addBullet(0);
      service.addBullet(0);
      service.removeBullet(0, 0);

      expect(service.form.controls.experience.at(0).controls.bullets.length).toBe(antes + 1);
    });
  });

  describe('formação acadêmica', () => {
    it('deve adicionar uma nova formação', () => {
      const antes = service.form.controls.education.length;
      service.addEducation();

      expect(service.form.controls.education.length).toBe(antes + 1);
    });

    it('deve remover a formação do índice informado', () => {
      const antes = service.form.controls.education.length;
      service.addEducation();
      service.addEducation();
      service.removeEducation(0);

      expect(service.form.controls.education.length).toBe(antes + 1);
    });
  });

  describe('skills', () => {
    it('deve adicionar uma skill com texto válido', () => {
      service.addSkill('Angular');

      expect(service.form.controls.skills.value).toContain('Angular');
    });

    it('deve remover espaços em branco nas extremidades antes de adicionar', () => {
      service.addSkill('  TypeScript  ');

      expect(service.form.controls.skills.value).toContain('TypeScript');
    });

    it('não deve adicionar skill vazia', () => {
      const antes = service.form.controls.skills.length;
      service.addSkill('');

      expect(service.form.controls.skills.length).toBe(antes);
    });

    it('não deve adicionar skill composta só por espaços em branco', () => {
      const antes = service.form.controls.skills.length;
      service.addSkill('   ');

      expect(service.form.controls.skills.length).toBe(antes);
    });

    it('deve remover a skill do índice informado', () => {
      service.addSkill('Angular');
      service.addSkill('React');
      service.removeSkill(0);

      expect(service.form.controls.skills.value).toEqual(['React']);
    });
  });

  describe('reorderSections', () => {
    it('deve mover uma seção da posição inicial para a posição final', () => {
      const ordemInicial = [...service.sectionOrder()];
      service.reorderSections(0, ordemInicial.length - 1);

      const novaOrdem = service.sectionOrder();
      expect(novaOrdem[novaOrdem.length - 1]).toBe(ordemInicial[0]);
      expect(novaOrdem.length).toBe(ordemInicial.length);
    });

    it('não deve alterar o tamanho da lista ao reordenar', () => {
      const tamanhoAntes = service.sectionOrder().length;
      service.reorderSections(0, 1);

      expect(service.sectionOrder().length).toBe(tamanhoAntes);
    });
  });

  describe('resumeData (computed)', () => {
    it('deve refletir o valor atual do formulário', () => {
      service.addSkill('Angular');

      expect(service.resumeData().skills).toContain('Angular');
    });

    it('deve incluir as seções extras ativas no snapshot', () => {
      service.addExtraSection('projects');

      expect(service.resumeData().activeExtraSections).toContain('projects');
    });

    it('deve incluir a ordem de exibição atual no snapshot', () => {
      service.addExtraSection('projects');

      expect(service.resumeData().sectionOrder).toContain('projects');
    });

    it('deve atualizar reativamente quando o formulário muda', () => {
      const antes = service.resumeData().skills.length;
      service.addSkill('React');

      expect(service.resumeData().skills.length).toBe(antes + 1);
    });
  });
});