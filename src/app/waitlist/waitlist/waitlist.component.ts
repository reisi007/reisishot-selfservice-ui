import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {beforeNow} from '../../commons/datetime.validator';
import {Observable, timer} from 'rxjs';
import {WaitlistApiService} from '../api/waitlist-api.service';
import {debounce} from 'rxjs/operators';
import {WaitlistItem, WaitlistPerson} from '../api/waitlist-api';

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss'],
})
export class WaitlistComponent implements OnInit {

  private static LOCAL_PERSON = 'WAITLIST_PERSON';

  person: FormGroup;
  showForm: boolean;
  publicItems: Observable<Array<WaitlistItem>>;
  privateItems: Observable<Array<WaitlistItem>>;
  private storage: Storage = window.localStorage;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: WaitlistApiService,
  ) {
  }

  get locallyStoredWaitlist(): WaitlistPerson {
    return JSON.parse(this.storage.getItem(WaitlistComponent.LOCAL_PERSON) || '{}') as WaitlistPerson;

  }

  set locallyStoredWaitlist(person: WaitlistPerson) {
    this.storage.setItem(WaitlistComponent.LOCAL_PERSON, JSON.stringify(person));
  }

  ngOnInit(): void {
    const p = this.locallyStoredWaitlist;
    this.buildForm(p);
    if (p.email && p.secret) {
      this.privateItems = this.apiService.getPrivateItems(p.email, p.secret);
      this.showForm = false;
    }
    else {
      this.publicItems = this.apiService.getPublicItems();
      this.showForm = true;
    }
  }

  getWaitlistPerson(): WaitlistPerson {
    return this.person.getRawValue() as WaitlistPerson;
  }

  isPersonValid(): boolean {
    return this.person.valid;
  }

  private buildForm(p: WaitlistPerson | null) {
    this.person = this.formBuilder.group({
      firstName: this.formBuilder.control(p?.firstName || '', [Validators.required]),
      lastName: this.formBuilder.control(p?.lastName || '', [Validators.required]),
      email: this.formBuilder.control(p?.email || '', [Validators.required, Validators.email]),
      birthday: this.formBuilder.control(p?.birthday || '', [Validators.required, beforeNow]),
      secret: this.formBuilder.control(p?.secret || '', [Validators.required, Validators.minLength(5), Validators.maxLength(36)]),
      availability: this.formBuilder.control(p?.availability || '', [Validators.required]),
      phone_number: this.formBuilder.control(p?.phone_number || '', [Validators.required, Validators.pattern('\\+?\\d{5,}')]),
      website: this.formBuilder.control(p?.website || ''),
    });

    this.person.valueChanges
        .pipe(
          debounce(() => timer(1500)),
        )
        .subscribe(() => {
          if (this.isPersonValid()) {
            const waitlistPerson = this.getWaitlistPerson();
            this.locallyStoredWaitlist = waitlistPerson;
            this.privateItems = this.apiService.getPrivateItems(waitlistPerson.email, waitlistPerson.secret);
          }
          else {
            this.publicItems = this.apiService.getPublicItems();
          }
        });
  }
}
