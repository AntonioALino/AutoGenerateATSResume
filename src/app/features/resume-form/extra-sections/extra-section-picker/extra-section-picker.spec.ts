import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraSectionPicker } from './extra-section-picker';

describe('ExtraSectionPicker', () => {
  let component: ExtraSectionPicker;
  let fixture: ComponentFixture<ExtraSectionPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraSectionPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraSectionPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
