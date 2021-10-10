import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResendContractAccessKeyComponent} from './resend-contract-access-key.component';

describe('ResendContractAccessKeyComponent', () => {
  let component: ResendContractAccessKeyComponent;
  let fixture: ComponentFixture<ResendContractAccessKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResendContractAccessKeyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendContractAccessKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
