import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Mail2diskComponent} from './mail2disk.component';

describe('Mail2diskComponent', () => {
  let component: Mail2diskComponent;
  let fixture: ComponentFixture<Mail2diskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [Mail2diskComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Mail2diskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
