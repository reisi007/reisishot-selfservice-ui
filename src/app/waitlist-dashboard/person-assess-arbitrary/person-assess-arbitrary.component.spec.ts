import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonAssessArbitraryComponent} from './person-assess-arbitrary.component';

describe('PersonAssessArbitraryComponent', () => {
  let component: PersonAssessArbitraryComponent;
  let fixture: ComponentFixture<PersonAssessArbitraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [PersonAssessArbitraryComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAssessArbitraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
