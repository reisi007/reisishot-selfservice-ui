import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailForm} from '../../../data/EmailFormValue';
import {trackByIndex} from '../../../trackByUtils';
import {beforeToday} from './person/age.validator';
import {ApiService} from '../../api/api.service';

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

  get emailArray(): FormArray {
    return this.emailForm.get('emails') as FormArray;
  }

  get emails(): EmailForm {
    return this.emailArray.value as EmailForm;
  }

  private static createItem() {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl('', [Validators.required, beforeToday]),
      age: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      emails: this.formBuilder.array([CreateContractComponent.createItem()]),
    });

    // TODO have a select
    this.apiService.getContracts()
        .subscribe(data => console.log('http request', data));
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
