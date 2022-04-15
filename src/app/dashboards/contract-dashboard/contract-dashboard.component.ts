import {AfterViewInit, Component, OnInit} from '@angular/core';
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
export class ContractDashboardComponent implements OnInit, AfterViewInit {
  emailForm!: FormGroup;
  availableContracts: Observable<string[]> = this.apiService.getContracts();
  formSentState!: { error: string, completed: boolean, sent: boolean };
  dbPersons!: Array<Person>;

  constructor(
    private apiService: ContractApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private adminLoginService: AdminLoginService,
  ) {
    this.emailForm = formBuilder.group({
      persons: formBuilder.array([this.createPerson()]),
      contractType: formBuilder.control('', [Validators.required]),
      text: formBuilder.control('', [Validators.required]),
      dueDate: formBuilder.control('', [Validators.required, afterNow]),
      baseUrl: formBuilder.control(window.location.origin, [Validators.required]),
    });
    this.reset();
  }

  reset() {
    this.formSentState = {error: '', completed: false, sent: false};
    // Dropdown does not look correct otherwise
    this.emailForm.reset({contractType: ''});
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

  ngOnInit() {
    this.loadPersonsFromDb();
  }

  ngAfterViewInit(): void {
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
    const user = this.adminLoginService.dataOrError;
    this.apiService.loadPersons(user.user, user.pwd).subscribe(data => this.dbPersons = data);
  }

  sendForm() {
    const contractData = this.emailForm.value as CreateContract;
    const loginData = this.adminLoginService.dataOrError;
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
