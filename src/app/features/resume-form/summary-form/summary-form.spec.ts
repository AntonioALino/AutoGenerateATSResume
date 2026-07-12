import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryForm } from './summary-form';

describe('SummaryForm', () => {
  let component: SummaryForm;
  let fixture: ComponentFixture<SummaryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
