import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveHallticketComponent } from './approve-hallticket.component';

describe('ApproveHallticketComponent', () => {
  let component: ApproveHallticketComponent;
  let fixture: ComponentFixture<ApproveHallticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveHallticketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveHallticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
