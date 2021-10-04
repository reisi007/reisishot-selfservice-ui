import {Component, Input, OnInit} from '@angular/core';
import {formatDate} from 'src/app/commons/datetime.formatter';
import {WaitlistApiService} from '../../api/waitlist-api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {convertPerson2Record, WaitlistItem, WaitlistPerson} from '../../api/waitlist-api';
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
  private personInternal: WaitlistPerson | null;

  constructor(
    private router: Router,
    private apiService: WaitlistApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  get url(): string {
    return this.router.url.split('#', 2)[0];
  }

  get person(): WaitlistPerson | null {
    return this.personInternal;
  }

  @Input() set person(value: WaitlistPerson | null) {
    this.personInternal = value;
  }

  get isValidPerson() {
    return this.person?.secret != null && this.person?.email != null;
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

  get text(): string {
    return this.registration.get('text').value;
  }

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  unregister(): void {
    if (this.personInternal) {
      this.apiService.deleteRegistration(this.personInternal.email, this.personInternal.secret, this.item.id).subscribe(() => {
        this.item.registered = '0';
      });
    }
  }

  register(): void {
    if (this.personInternal && this.max_waiting > 0) {
      this.apiService.registerForWaitlist(convertPerson2Record(this.personInternal, this.item.id, this.text)).subscribe(() => {
        this.item.registered = '1';
      });
    }
  }

  ngOnInit(): void {
    this.registration = this.formBuilder.group({
      text: this.formBuilder.control(''),
    });
  }
}
