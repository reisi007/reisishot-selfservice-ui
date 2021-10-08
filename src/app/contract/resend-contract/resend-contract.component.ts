import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {trackByIndex} from '../../trackByUtils';
import {afterNow, beforeNow} from '../../commons/datetime.validator';
import {ContractApiService} from '../api/contract-api.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CreateContract, Person} from '../api/createContract';

@Component({
  selector: 'app-resend-contract',
  templateUrl: './resend-contract.component.html',
  styleUrls: ['./resend-contract.component.scss'],
})
export class ResendContractComponent implements OnInit {

  constructor(
    private apiService: ContractApiService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  get personArray(): FormArray {
    return this.emailForm.get('persons') as FormArray;
  }

  get emails(): CreateContract {
    return this.emailForm.getRawValue() as CreateContract;
  }

  get additionalText(): string {
    return this.emailForm.get('text').value as string;
  }

  get contractType(): string {
    return this.emailForm.get('contractType').value;
  }

  private static LOCAL_PERSONS = 'LOCAL_PERSONS';
  emailForm: FormGroup;
  availableContracts: Observable<string[]> = this.apiService.getContracts();
  formSentState = {error: '', completed: false, sent: false};
  dbPersons: Observable<Array<Person>>;

  private static calculateKey(p: Person): string {
    return p.firstName + ' ' + p.lastName + ' ' + p.email + ' ' + p.birthday;
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      persons: this.formBuilder.array([this.createPerson()]),
      user: this.formBuilder.control('', [Validators.required]),
      pwd: this.formBuilder.control('', [Validators.required]),
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
    this.dbPersons = this.apiService.loadPersons(this.emails.user, this.emails.pwd);
  }

  sendForm() {
    this.apiService.createContract(this.emailForm.value)
        .subscribe(
          () => this.formSentState.completed = true,
          () => {
            this.formSentState.sent = false;
            this.formSentState.error = 'Fehler beim Senden des Formulars!';
          },
        );

    this.formSentState.sent = true;
  }

  previewContract() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['contracts', this.emailForm.get('contractType').value]);
  }

  private createPerson(p: Person = null) {
    return this.formBuilder.group({
      firstName: this.formBuilder.control(p?.firstName || '', [Validators.required]),
      lastName: this.formBuilder.control(p?.lastName || '', [Validators.required]),
      email: this.formBuilder.control(p?.email || '', [Validators.required, Validators.email]),
      birthday: this.formBuilder.control(p?.birthday || '', [Validators.required, beforeNow]),
    });
  }


}
