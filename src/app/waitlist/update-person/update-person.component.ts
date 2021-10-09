import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {WaitlistApiService} from '../api/waitlist-api.service';
import {DatefieldSupport} from '../../commons/datefield-support';
import {ActivatedRoute, Router} from '@angular/router';
import {Userdata, WaitlistPerson} from '../api/waitlist-api';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss'],
})
export class UpdatePersonComponent extends DatefieldSupport implements OnInit {

  user: Userdata;
  dirty = false;

  constructor(
    formBuilder: FormBuilder,
    private apiService: WaitlistApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super(formBuilder);
  }

  ngOnInit(): void {
    this.buildForm();
    this.route.params.subscribe(routeData => {
      this.user = {
        email: routeData.email,
        access_key: routeData.access_key,
      } as Userdata;


      this.apiService.loadPerson(this.user)
          .subscribe(
            data => {
              this.person.patchValue(data);
              this.setupDateField('birthday');
              this.person.valueChanges.subscribe(() => {
                this.dirty = true;
              });

            },
            () => this.router.navigate(['waitlist']),
          );
    });
  }

  update() {
    const person = this.person.getRawValue() as WaitlistPerson;
    this.dirty = false;
    this.apiService.storePerson(this.user, person).subscribe(
      () => this.goBack(),
      () => this.dirty = true,
    );
  }

  goBack() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
