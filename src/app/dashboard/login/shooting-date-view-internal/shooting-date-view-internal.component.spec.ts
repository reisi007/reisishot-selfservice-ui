import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShootingDateViewInternalComponent} from './shooting-date-view-internal.component';

describe('ShootingDateViewInternalComponent', () => {
  let component: ShootingDateViewInternalComponent;
  let fixture: ComponentFixture<ShootingDateViewInternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ShootingDateViewInternalComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingDateViewInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
