import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateorgComponent } from './createorg.component';

describe('CreateorgComponent', () => {
  let component: CreateorgComponent;
  let fixture: ComponentFixture<CreateorgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateorgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
