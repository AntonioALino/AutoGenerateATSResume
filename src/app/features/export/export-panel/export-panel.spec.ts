import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPanel } from './export-panel';

describe('ExportPanel', () => {
  let component: ExportPanel;
  let fixture: ComponentFixture<ExportPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
