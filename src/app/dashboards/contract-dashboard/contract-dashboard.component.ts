import {Component, OnInit} from '@angular/core';
import {ContractApiService} from '../../contract/api/contract-api.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CreateContract, Person} from '../../contract/api/createContract';
import {Observable} from 'rxjs';
import {afterNow, beforeNow} from '../../commons/datetime.validator';
import {trackByIndex} from '../../trackByUtils';
import {AdminLoginService} from '../../dashboard/login/admin-login.service';

@Component({
  selector: 'app-contract-dashboard',
  templateUrl: './contract-dashboard.component.html',
  styleUrls: ['./contract-dashboard.component.scss'],
})
export class ContractDashboardComponent implements OnInit {
  private static LOCAL_PERSONS = 'LOCAL_PERSONS';
  emailForm!: FormGroup;
  availableContracts: Observable<string[]> = this.apiService.getContracts();
  formSentState = {error: '', completed: false, sent: false};
  dbPersons!: Array<Person>;

  constructor(
    private apiService: ContractApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private adminLoginService: AdminLoginService,
  ) {
  }

  get personArray(): FormArray {
    return this.emailForm.get('persons') as FormArray;
  }

  get emails(): CreateContract {
    return this.emailForm.getRawValue() as CreateContract;
  }

  get additionalText(): string | undefined {
    return this.emailForm.get('text')?.value as string | undefined;
  }

  get contractType(): string | undefined {
    return this.emailForm.get('contractType')?.value as string | undefined;
  }

  private static calculateKey(p: Person): string {
    return p.firstName + ' ' + p.lastName + ' ' + p.email + ' ' + p.birthday;
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      persons: this.formBuilder.array([this.createPerson()]),
      contractType: this.formBuilder.control('', [Validators.required]),
      text: this.formBuilder.control('', [Validators.required]),
      dueDate: this.formBuilder.control('', [Validators.required, afterNow]),
      baseUrl: this.formBuilder.control(window.location.origin, [Validators.required]),
    });

    const person = history.state.person as Person | null;

    if (person) {
      this.personArray.removeAt(0);
      this.personArray.insert(0, this.createPerson(person));
    }

    this.loadPersonsFromDb();
  }

  addPerson() {
    this.personArray.push(this.createPerson());
  }

  removePerson() {
    if (this.personArray.length > 1) {
      this.personArray.removeAt(this.personArray.length - 1);
    }
  }

  addStoredPerson(p: Person) {
    this.personArray.insert(0, this.createPerson(p));
  }

  trackByIndex(index: number, o: object) {
    return trackByIndex(index, o);
  }

  loadPersonsFromDb() {
    const user = this.adminLoginService.data;
    if (user == null) {
      return;
    }
    this.apiService.loadPersons(user.user, user.pwd).subscribe(data => this.dbPersons = data);
  }

  sendForm() {
    const contractData = this.emailForm.value as CreateContract;
    const loginData = this.adminLoginService.data;
    if (loginData == null) {
      return;
    }
    this.apiService.createContract({...contractData, ...loginData}).subscribe(
      {
        next: () => (this.formSentState.completed = true),
        error: () => {
          this.formSentState.sent = false;
          this.formSentState.error = 'Fehler beim Senden des Formulars!';
        },
      },
    );

    this.formSentState.sent = true;
  }

  previewContract() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['contracts', this.emailForm.get('contractType')?.value]);
  }

  private createPerson(p?: Person) {
    return this.formBuilder.group({
      firstName: this.formBuilder.control(p?.firstName || '', [Validators.required]),
      lastName: this.formBuilder.control(p?.lastName || '', [Validators.required]),
      email: this.formBuilder.control(p?.email || '', [Validators.required, Validators.email]),
      birthday: this.formBuilder.control(p?.birthday || '', [Validators.required, beforeNow]),
    });
  }
}
