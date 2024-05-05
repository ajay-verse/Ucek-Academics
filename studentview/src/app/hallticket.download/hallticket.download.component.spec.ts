import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallticketDownloadComponent } from './hallticket.download.component';

describe('HallticketDownloadComponent', () => {
  let component: HallticketDownloadComponent;
  let fixture: ComponentFixture<HallticketDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallticketDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallticketDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
