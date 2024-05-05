import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateApplicationComponent } from './certificate-application.component';

describe('CertificateApplicationComponent', () => {
  let component: CertificateApplicationComponent;
  let fixture: ComponentFixture<CertificateApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
