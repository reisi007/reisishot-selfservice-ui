import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DisplayContractComponent} from './display-contract.component';

describe('DisplayContractComponent', () => {
  let component: DisplayContractComponent;
  let fixture: ComponentFixture<DisplayContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayContractComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
