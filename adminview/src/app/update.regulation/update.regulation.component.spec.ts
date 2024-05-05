import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRegulationComponent } from './update.regulation.component';

describe('UpdateRegulationComponent', () => {
  let component: UpdateRegulationComponent;
  let fixture: ComponentFixture<UpdateRegulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRegulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
