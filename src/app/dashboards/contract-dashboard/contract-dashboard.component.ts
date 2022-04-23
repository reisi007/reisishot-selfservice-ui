import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ContractApiService} from '../../contract/api/contract-api.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CreateContract, Person} from '../../contract/api/createContract';
import {debounceTime, distinctUntilChanged, fromEvent, Observable} from 'rxjs';
import {afterNow, beforeNow} from '../../commons/datetime.validator';
import {AdminLoginDataService} from '../../dashboard/login/admin-login-data.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {map} from 'rxjs/operators';
import {formatDate} from 'src/app/commons/datetime.formatter';

@UntilDestroy()
@Component({
  selector: 'app-contract-dashboard',
  templateUrl: './contract-dashboard.component.html',
  styleUrls: ['./contract-dashboard.component.scss'],
})
export class ContractDashboardComponent implements OnInit, AfterViewInit {
  emailForm!: FormGroup;
  availableContracts: Observable<string[]> = this.apiService.getContracts();
  formSentState!: { error: string, completed: boolean, sent: boolean };
  dbPersonsRaw!: Array<Person & { search: string }>;
  dbPersonsFiltered!: Array<Person & { search: string }>;
  @ViewChild('personSearch') input!: ElementRef<HTMLInputElement>;

  constructor(
    private apiService: ContractApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private adminLoginService: AdminLoginDataService,
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

  ngOnInit() {
    const {user, pwd} = this.adminLoginService.dataOrError;
    this.apiService.loadPersons(user, pwd).subscribe(
      {
        next: data => {
          this.dbPersonsRaw = data.map(p => ({
            ...p,
            search: p.firstName?.toLowerCase() + ' ' + p.lastName.toLowerCase() + ' ' + p.email.toLowerCase() + ' ' + formatDate(p.birthday),
          }));
          this.dbPersonsFiltered = this.dbPersonsRaw;
        },
      },
    );
  }

  ngAfterViewInit(): void {
    const person = history.state.person as Person | null;

    if (person) {
      this.personArray.removeAt(0);
      this.personArray.insert(0, this.createPerson(person));
    }


    fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup')
      .pipe(
        untilDestroyed(this),
        map(() => this.input.nativeElement.value),
        debounceTime(150),
        map(v => {
          console.log(v);
          return v.toLowerCase();
        }),
        distinctUntilChanged(),
      ).subscribe({
      next: value => {
        if (value) {
          this.dbPersonsFiltered = this.dbPersonsRaw.filter(p => p.search.includes(value));
        }
        else {
          this.dbPersonsFiltered = this.dbPersonsRaw;
        }
      },
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

  addStoredPerson(p: Person) {
    this.personArray.insert(0, this.createPerson(p));
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

  personContractTrackBy(idx: number, item: Person & { search: string }) {
    return item.search;
  }

  formatDate(dateString: string) {
    return formatDate(dateString);
  }
}
