import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailForm} from '../../../data/EmailFormValue';
import {trackByIndex} from '../../../trackByUtils';
import {afterNow, beforeNow} from '../../../commons/datetime.validator';
import {ApiService} from '../../api/api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss'],
})
export class CreateContractComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  emailForm: FormGroup;

  availableContracts: Observable<string[]> = this.apiService.getContracts();

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
      dueDate: new FormControl('', [Validators.required, afterNow]),
    });
  }

  addEmail() {
    this.emailArray.push(CreateContractComponent.createItem());
  }

  removeEmail() {
    if (this.emailArray.length > 1) {
      this.emailArray.removeAt(this.emailArray.length - 1);
    }
  }

  trackByIndex(index: number, o: object) {
    return trackByIndex(index, o);
  }

  sendForm() {
    const emails = this.emails;
    console.log('Sent', emails);
  }
}
