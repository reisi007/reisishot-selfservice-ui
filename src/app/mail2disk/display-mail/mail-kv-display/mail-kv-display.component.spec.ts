import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MailKVDisplayComponent} from './mail-kv-display.component';

describe('MailKVDisplayComponent', () => {
  let component: MailKVDisplayComponent;
  let fixture: ComponentFixture<MailKVDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
                   declarations: [MailKVDisplayComponent],
                 })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailKVDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
