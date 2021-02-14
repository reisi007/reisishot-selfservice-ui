import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailForm} from '../../../data/EmailFormValue';
import {trackByIndex} from '../../../trackByUtils';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss'],
})
export class CreateContractComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
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
      email: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      emails: this.formBuilder.array([CreateContractComponent.createItem()]),
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
