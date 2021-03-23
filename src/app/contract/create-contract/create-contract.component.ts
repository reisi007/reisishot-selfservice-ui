import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailForm} from '../../data/EmailFormValue';
import {trackByIndex} from '../../trackByUtils';
import {afterNow, beforeNow} from '../../commons/datetime.validator';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CreateContract, Person} from '../api/createContract';
import {LocallyStoredPersons} from './locallyStoredPersons';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss'],
})
export class CreateContractComponent implements OnInit {

  private static LOCAL_PERSONS = 'LOCAL_PERSONS';
  emailForm: FormGroup;
  availableContracts: Observable<string[]> = this.apiService.getContracts();
  formSentState = {error: '', completed: false, sent: false};

  private storage: Storage = window.localStorage;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  get locallyStoredPersons(): LocallyStoredPersons {
    return JSON.parse(this.storage.getItem(CreateContractComponent.LOCAL_PERSONS) || '{}');
  }

  set locallyStoredPersons(persons: LocallyStoredPersons) {
    this.storage.setItem(CreateContractComponent.LOCAL_PERSONS, JSON.stringify(persons));
  }

  get personArray(): FormArray {
    return this.emailForm.get('persons') as FormArray;
  }

  get emails(): EmailForm {
    return this.personArray.value as EmailForm;
  }

  get additionalText(): string {
    return this.emailForm.get('text').value as string;
  }

  get contractType(): string {
    return this.emailForm.get('contractType').value;
  }

  get locallyStoredPersonArray(): Array<Person> {
    return Object.values(this.locallyStoredPersons);
  }

  private static createPerson(p: Person = null) {
    return new FormGroup({
      firstName: new FormControl(p?.firstName || '', [Validators.required]),
      lastName: new FormControl(p?.lastName || '', [Validators.required]),
      email: new FormControl(p?.email || '', [Validators.required, Validators.email]),
      birthday: new FormControl(p?.birthday || '', [Validators.required, beforeNow]),
    });
  }

  private static calculateKey(p: Person): string {
    return p.firstName + ' ' + p.lastName + ' ' + p.email + ' ' + p.birthday;
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      persons: this.formBuilder.array([CreateContractComponent.createPerson()]),
      user: new FormControl('', [Validators.required]),
      pwd: new FormControl('', [Validators.required]),
      contractType: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required, afterNow]),
      baseUrl: new FormControl(window.location.origin, [Validators.required]),
    });
  }

  addPerson() {
    this.personArray.push(CreateContractComponent.createPerson());
  }

  removePerson() {
    if (this.personArray.length > 1) {
      this.personArray.removeAt(this.personArray.length - 1);
    }
  }

  addLocallyStoredPerson(p: Person) {
    console.log('Adding', p);
    this.personArray.insert(0, CreateContractComponent.createPerson(p));
  }

  trackByIndex(index: number, o: object) {
    return trackByIndex(index, o);
  }

  sendForm() {
    const data: CreateContract = this.emailForm.value;
    data.persons.forEach(p => {
      const lsp = this.locallyStoredPersons;
      lsp[CreateContractComponent.calculateKey(p)] = p;
      this.locallyStoredPersons = lsp;
    });
    this.apiService.createContract(data)
        .subscribe(
          () => this.formSentState.completed = true,
          () => {
            this.formSentState.sent = false;
            this.formSentState.error = 'Fehler beim Senden des Formulars!';
          },
        )
    ;

    this.formSentState.sent = true;
  }

  previewContract() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['contracts', this.emailForm.get('contractType').value]);
  }
}
