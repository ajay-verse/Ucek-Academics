import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplySemesterApplicationComponent } from './supply-semester-application.component';

describe('SupplySemesterApplicationComponent', () => {
  let component: SupplySemesterApplicationComponent;
  let fixture: ComponentFixture<SupplySemesterApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplySemesterApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplySemesterApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
