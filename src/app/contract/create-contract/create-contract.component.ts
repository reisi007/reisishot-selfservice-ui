import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailForm} from '../../data/EmailFormValue';
import {trackByIndex} from '../../trackByUtils';
import {afterNow, beforeNow} from '../../commons/datetime.validator';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss'],
})
export class CreateContractComponent implements OnInit {

  emailForm: FormGroup;
  availableContracts: Observable<string[]> = this.apiService.getContracts();
  contractMd: string;

  formSentState = {error: '', completed: false, sent: false};

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  get emailArray(): FormArray {
    return this.emailForm.get('persons') as FormArray;
  }

  get emails(): EmailForm {
    return this.emailArray.value as EmailForm;
  }

  private static createItem() {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl('', [Validators.required, beforeNow]),
    });
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      persons: this.formBuilder.array([CreateContractComponent.createItem()]),
      user: new FormControl('', [Validators.required]),
      pwd: new FormControl('', [Validators.required]),
      contractType: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required, afterNow]),
      baseUrl: new FormControl(window.location.origin, [Validators.required]),
    });
  }

  addPerson() {
    this.emailArray.push(CreateContractComponent.createItem());
  }

  removePerson() {
    if (this.emailArray.length > 1) {
      this.emailArray.removeAt(this.emailArray.length - 1);
    }
  }

  trackByIndex(index: number, o: object) {
    return trackByIndex(index, o);
  }

  sendForm() {
    this.apiService.createContract(this.emailForm.value)
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
    this.apiService.getContractTemplate(this.emailForm.get('contractType').value)
        .subscribe(param => this.contractMd = param);
  }
}
