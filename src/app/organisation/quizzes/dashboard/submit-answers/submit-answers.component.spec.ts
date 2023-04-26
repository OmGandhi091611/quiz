import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAnswersComponent } from './submit-answers.component';

describe('SubmitAnswersComponent', () => {
  let component: SubmitAnswersComponent;
  let fixture: ComponentFixture<SubmitAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
