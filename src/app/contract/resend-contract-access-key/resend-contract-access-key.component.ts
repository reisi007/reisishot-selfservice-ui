import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api/api.service';
import {EMailFormValue} from './EMailFormValue';

@Component({
  selector: 'app-resend-contract-access-key',
  templateUrl: './resend-contract-access-key.component.html',
  styleUrls: ['./resend-contract-access-key.component.scss'],
})
export class ResendContractAccessKeyComponent implements OnInit {

  emailForm: FormGroup;
  sent = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
    });
  }

  sendForm() {
    const email = (this.emailForm.value as EMailFormValue).email;
    this.apiService.sendAllContractLinks(email).subscribe(() => this.sent = true, () => this.sent = false);
    this.sent = true;
  }
}
