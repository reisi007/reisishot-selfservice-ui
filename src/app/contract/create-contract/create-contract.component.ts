import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailForm} from '../../data/EmailFormValue';
import {trackByIndex} from '../../trackByUtils';
import {afterNow, beforeNow} from '../../commons/datetime.validator';
import {ContractApiService} from '../api/contract-api.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CreateContract, Person} from '../api/createContract';
import {LocallyStoredPersons, StoredPerson} from './locallyStoredPersons';

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
    private apiService: ContractApiService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  get locallyStoredPersons(): Array<StoredPerson> {
    const stored = JSON.parse(this.storage.getItem(CreateContractComponent.LOCAL_PERSONS) || '{}') as LocallyStoredPersons;
    return Object.values(stored).reverse();

  }

  set locallyStoredPersons(persons: Array<StoredPerson>) {
    const toSave: LocallyStoredPersons = {};
    persons.forEach(sp => {
      const key = CreateContractComponent.calculateKey(sp);
      const value = toSave[key];
      if (value == null || value.lastUsed < sp.lastUsed) {
        toSave[key] = sp;
      }
    });
    this.storage.setItem(CreateContractComponent.LOCAL_PERSONS, JSON.stringify(toSave));
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
  }

  addPerson() {
    this.personArray.push(this.createPerson());
  }

  removePerson() {
    if (this.personArray.length > 1) {
      this.personArray.removeAt(this.personArray.length - 1);
    }
  }

  addLocallyStoredPerson(p: Person) {
    this.personArray.insert(0, this.createPerson(p));
  }

  trackByIndex(index: number, o: object) {
    return trackByIndex(index, o);
  }

  sendForm() {
    const data: CreateContract = this.emailForm.value;
    const now = new Date();
    data.persons.forEach(p => {
      const lsp = this.locallyStoredPersons;
      const sp = p as StoredPerson;
      sp.lastUsed = now;
      lsp.unshift(sp);
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

  private createPerson(p: Person = null) {
    return this.formBuilder.group({
      firstName: this.formBuilder.control(p?.firstName || '', [Validators.required]),
      lastName: this.formBuilder.control(p?.lastName || '', [Validators.required]),
      email: this.formBuilder.control(p?.email || '', [Validators.required, Validators.email]),
      birthday: this.formBuilder.control(p?.birthday || '', [Validators.required, beforeNow]),
    });
  }
}
