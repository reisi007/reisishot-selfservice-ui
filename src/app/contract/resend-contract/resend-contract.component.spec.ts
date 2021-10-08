import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResendContractComponent} from './resend-contract.component';

describe('CreateContractComponent', () => {
  let component: ResendContractComponent;
  let fixture: ComponentFixture<ResendContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [ResendContractComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
