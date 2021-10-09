import {Component, Input, OnInit} from '@angular/core';
import {formatDate} from 'src/app/commons/datetime.formatter';
import {WaitlistApiService} from '../../api/waitlist-api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Userdata, WaitlistItem, WaitlistRecord} from '../../api/waitlist-api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-waitlist-item',
  templateUrl: './waitlist-item.component.html',
  styleUrls: ['./waitlist-item.component.scss'],
})
export class WaitlistItemComponent implements OnInit {
  @Input()
  item: WaitlistItem;
  registration: FormGroup;
  user: Userdata | null;

  constructor(
    private router: Router,
    private apiService: WaitlistApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  get url(): string {
    return this.router.url.split('#', 2)[0];
  }

  get person(): Userdata | null {
    return this.user;
  }

  @Input() set person(value: Userdata | null) {
    this.user = value;
  }

  get canRegister() {
    return this.item.max_waiting == null || this.max_waiting > 0;
  }

  get max_waiting() {
    const val = this.item?.max_waiting;
    if (val == null) {
      return null;
    }
    else {
      return parseInt(val, 10);
    }
  }

  get registrationInfo(): WaitlistRecord {
    return this.registration.getRawValue() as WaitlistRecord;
  }

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  register() {
    if (this.user) {
      this.apiService.registerForWaitlist(this.user, this.registrationInfo);
    }
  }

  unregister() {
    if (this.user) {
      this.apiService.deleteRegistration(this.user, this.item.id);
    }
  }

  ngOnInit(): void {
    this.registration = this.formBuilder.group({
      item_id: this.formBuilder.control(this.item.id),
      text: this.formBuilder.control(''),
    });
  }
}
