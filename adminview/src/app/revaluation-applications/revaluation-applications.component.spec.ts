import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevaluationApplicationsComponent } from './revaluation-applications.component';

describe('RevaluationApplicationsComponent', () => {
  let component: RevaluationApplicationsComponent;
  let fixture: ComponentFixture<RevaluationApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevaluationApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevaluationApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
