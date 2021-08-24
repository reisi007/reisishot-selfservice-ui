import {Component, Input} from '@angular/core';
import {formatDate} from 'src/app/commons/datetime.formatter';
import {WaitlistItem, WaitlistPerson} from '../waitlist/waitlistData';

@Component({
  selector: 'app-waitlist-item',
  templateUrl: './waitlist-item.component.html',
  styleUrls: ['./waitlist-item.component.scss'],
})
export class WaitlistItemComponent {
  @Input()
  item: WaitlistItem;

  personInternal: WaitlistPerson | null;

  constructor() {
  }

  get person(): WaitlistPerson | null {
    return this.personInternal;
  }

  @Input() set person(value: WaitlistPerson | null) {
    this.personInternal = value;
  }

  get canRegister() {
    return this.person.secret != null && this.person.email != null;
  }

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  unregister(): void {
    // TODO implement
  }

  register(): void {
    // TODO implement
  }
}
