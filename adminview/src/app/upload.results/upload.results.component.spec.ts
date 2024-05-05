import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResultsComponent } from './upload.results.component';

describe('UploadResultsComponent', () => {
  let component: UploadResultsComponent;
  let fixture: ComponentFixture<UploadResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
