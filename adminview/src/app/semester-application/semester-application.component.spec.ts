import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterApplicationComponent } from './semester-application.component';

describe('SemesterApplicationComponent', () => {
  let component: SemesterApplicationComponent;
  let fixture: ComponentFixture<SemesterApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
