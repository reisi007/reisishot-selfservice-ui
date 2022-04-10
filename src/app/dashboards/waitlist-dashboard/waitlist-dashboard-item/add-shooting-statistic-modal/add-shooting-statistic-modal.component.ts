import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {WaitlistItemWithRegistrations} from '../../admin-api/waitlist-admin-api';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WaitlistAdminApiService} from '../../admin-api/waitlist-admin-api.service';
import {AdminLoginService} from '../../../../dashboard/login/admin-login.service';

@Component({
  selector: 'app-add-shooting-statistic-modal',
  templateUrl: './add-shooting-statistic-modal.component.html',
  styleUrls: ['./add-shooting-statistic-modal.component.scss'],
})
export class AddShootingStatisticModalComponent {
  @Input()
  waitlistItem!: WaitlistItemWithRegistrations;
  @ViewChild('dialogElement')
  dialogRef?: ElementRef;
  error?: any;
  isRequestPending = false;

  addStatisticsForm: FormGroup;
  @Output() newShow = new EventEmitter<boolean>();

  constructor(
    formBuilder: FormBuilder,
    private apiService: WaitlistAdminApiService,
    private adminLoginService: AdminLoginService,
  ) {
    this.addStatisticsForm = formBuilder.group({
      'isMinor': formBuilder.control(false),
      'isGroup': formBuilder.control(false),
    });
  }

  get formData(): { isMinor: boolean, isGroup: boolean } {
    return this.addStatisticsForm.value;
  }

  get show(): boolean {
    return this.dialog !== undefined && this.dialog.hasAttribute('open');
  }

  @Input()
  set show(value: boolean) {
    this.newShow.emit(value);
    if (value) {
      this.dialog?.setAttribute('open', '');
    }
    else {
      this.dialog?.removeAttribute('open');
    }
  }

  get dialog(): HTMLDialogElement | undefined {
    return this.dialogRef?.nativeElement;
  }


  save() {
    this.isRequestPending = true;
    const {isMinor, isGroup} = this.formData;
    const {user, pwd} = this.adminLoginService.dataOrError;
    this.apiService.createNewShootingStatisticsEntry(user, pwd, this.waitlistItem.id, isMinor, isGroup)
        .subscribe({
          next: () => {
            this.isRequestPending = false;
            this.show = false;
          },
          error: err => {
            this.error = err;
          },
        });

  }
}
