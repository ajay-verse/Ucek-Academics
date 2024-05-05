import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallticketStatusComponent } from './hallticket.status.component';

describe('HallticketStatusComponent', () => {
  let component: HallticketStatusComponent;
  let fixture: ComponentFixture<HallticketStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallticketStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallticketStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
