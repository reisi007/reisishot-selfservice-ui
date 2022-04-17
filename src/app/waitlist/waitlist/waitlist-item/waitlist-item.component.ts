import {Component, Input, OnInit} from '@angular/core';
import {formatDate} from 'src/app/commons/datetime.formatter';
import {WaitlistApiService} from '../../api/waitlist-api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Userdata, WaitlistItem, WaitlistRecord} from '../../api/waitlist-api';
import {Router} from '@angular/router';
import {MatomoTracker} from '@ngx-matomo/tracker';
import {ExtMatomoTracker} from '../../../commons/ExtMatomoTracker';

const EVENT_CATEGORY = 'waitlist';

@Component({
  selector: 'app-waitlist-item',
  templateUrl: './waitlist-item.component.html',
  styleUrls: ['./waitlist-item.component.scss'],
})
export class WaitlistItemComponent implements OnInit {
  @Input()
  item!: WaitlistItem;
  registration!: FormGroup;
  user: Userdata | null | undefined;
  private tracker: ExtMatomoTracker;

  constructor(
    private router: Router,
    private apiService: WaitlistApiService,
    private formBuilder: FormBuilder,
    tracker: MatomoTracker,
  ) {
    this.tracker = new ExtMatomoTracker(tracker);
  }

  get url(): string {
    return this.router.url.split('#', 2)[0];
  }

  get person(): Userdata | null | undefined {
    return this.user;
  }

  @Input() set person(value: Userdata | null | undefined) {
    this.user = value;
  }

  get canRegister(): boolean {
    return this.item != undefined && this.item.max_waiting == null ||
           this.max_waiting != null && this.max_waiting > 0;
  }

  get max_waiting(): number | null {
    const val = this.item?.max_waiting;
    if (val == null) {
      return null;
    }
    else {
      return parseInt(val, 10);
    }
  }

  get registrationInfo(): WaitlistRecord {
    return this.registration?.getRawValue() as WaitlistRecord;
  }

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  register(): void {
    if (this.user) {
      this.apiService.registerForShooting(this.user, this.registrationInfo).subscribe(() => {
        this.tracker.trackEvent(EVENT_CATEGORY, 'register', this.item.short);
        this.item.registered = '1';
      });
    }
  }

  unregister(): void {
    if (this.user) {
      this.apiService.deleteRegistration(this.user, this.item.id).subscribe(() => (this.item.registered = '0'));
    }
  }

  ngOnInit(): void {
    this.registration = this.formBuilder.group({
      item_id: this.formBuilder.control(this.item.id),
      text: this.formBuilder.control(''),
    });
  }
}
