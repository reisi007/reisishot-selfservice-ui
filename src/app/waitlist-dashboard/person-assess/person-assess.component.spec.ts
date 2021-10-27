import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonAssessComponent} from './person-assess.component';

describe('PersonAssessComponent', () => {
  let component: PersonAssessComponent;
  let fixture: ComponentFixture<PersonAssessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [PersonAssessComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
