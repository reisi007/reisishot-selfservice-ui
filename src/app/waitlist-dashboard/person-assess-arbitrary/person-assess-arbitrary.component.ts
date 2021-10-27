import {Component, Input, OnInit} from '@angular/core';
import {WaitlistAdminApiService} from '../admin-api/waitlist-admin-api.service';
import {WaitlistPerson} from '../../waitlist/api/waitlist-api';

@Component({
  selector: 'app-person-assess-arbitrary',
  templateUrl: './person-assess-arbitrary.component.html',
  styleUrls: ['./person-assess-arbitrary.component.scss'],
})
export class PersonAssessArbitraryComponent implements OnInit {

  @Input()
  auth!: { user: string; pwd: string };

  persons!: Array<WaitlistPerson>;

  selectedMail: string | undefined;

  constructor(private apiService: WaitlistAdminApiService) {
  }

  ngOnInit(): void {
    this.apiService.loadRegisteredPersons(this.auth.user, this.auth.pwd)
        .subscribe(data => {
          this.selectedMail = data[0].email;
          this.persons = data;
        });
  }

  changeEmail($event: Event) {
    const select = $event.target as HTMLSelectElement;
    this.selectedMail = select.value;
  }
}
