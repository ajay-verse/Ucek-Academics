import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResultsCsvComponent } from './upload.results.csv.component';

describe('UploadResultsCsvComponent', () => {
  let component: UploadResultsCsvComponent;
  let fixture: ComponentFixture<UploadResultsCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadResultsCsvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadResultsCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
