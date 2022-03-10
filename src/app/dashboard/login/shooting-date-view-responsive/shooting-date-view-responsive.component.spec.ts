import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShootingDateViewResponsiveComponent} from './shooting-date-view-responsive.component';

describe('ShootingDateViewResponsiveComponent', () => {
  let component: ShootingDateViewResponsiveComponent;
  let fixture: ComponentFixture<ShootingDateViewResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ShootingDateViewResponsiveComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingDateViewResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
