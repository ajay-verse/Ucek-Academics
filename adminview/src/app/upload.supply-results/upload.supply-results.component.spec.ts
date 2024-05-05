import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSupplyResultsComponent } from './upload.supply-results.component';

describe('UploadSupplyResultsComponent', () => {
  let component: UploadSupplyResultsComponent;
  let fixture: ComponentFixture<UploadSupplyResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSupplyResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSupplyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
