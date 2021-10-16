import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReferrerInfoTopComponent} from './referrer-info-top.component';

describe('ReferrerInfoTopComponent', () => {
  let component: ReferrerInfoTopComponent;
  let fixture: ComponentFixture<ReferrerInfoTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ReferrerInfoTopComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrerInfoTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
