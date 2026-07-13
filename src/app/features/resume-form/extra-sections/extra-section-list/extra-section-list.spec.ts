import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraSectionList } from './extra-section-list';

describe('ExtraSectionList', () => {
  let component: ExtraSectionList;
  let fixture: ComponentFixture<ExtraSectionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraSectionList],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraSectionList);
    fixture.componentRef.setInput('sectionKey', 'projects');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
