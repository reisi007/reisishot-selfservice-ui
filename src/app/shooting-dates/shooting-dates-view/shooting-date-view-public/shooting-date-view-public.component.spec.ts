import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShootingDateViewPublicComponent} from './shooting-date-view-public.component';

describe('ShootingDateViewPublicComponent', () => {
  let component: ShootingDateViewPublicComponent;
  let fixture: ComponentFixture<ShootingDateViewPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ShootingDateViewPublicComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingDateViewPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
