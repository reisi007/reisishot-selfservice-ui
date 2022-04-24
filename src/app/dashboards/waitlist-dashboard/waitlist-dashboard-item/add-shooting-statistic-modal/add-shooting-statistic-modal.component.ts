import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WaitlistItemWithRegistrations} from '../../admin-api/waitlist-admin-api';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WaitlistAdminApiService} from '../../admin-api/waitlist-admin-api.service';
import {AdminLoginDataService} from '../../../../dashboard/login/admin-login-data.service';

@Component({
  selector: 'app-add-shooting-statistic-modal',
  templateUrl: './add-shooting-statistic-modal.component.html',
  styleUrls: ['./add-shooting-statistic-modal.component.scss'],
})
export class AddShootingStatisticModalComponent {
  @Input()
  waitlistItem!: WaitlistItemWithRegistrations;

  error?: any;
  isRequestPending = false;

  addStatisticsForm: FormGroup;

  @Output()
  newShow = new EventEmitter<boolean>();

  private _show: boolean = false;

  get show(): boolean {
    return this._show;
  }

  @Input()
  set show(value: boolean) {
    this._show = value;
  }

  constructor(
    formBuilder: FormBuilder,
    private apiService: WaitlistAdminApiService,
    private adminLoginService: AdminLoginDataService,
  ) {
    this.addStatisticsForm = formBuilder.group({
      'isMinor': formBuilder.control(false),
      'isGroup': formBuilder.control(false),
    });
  }

  get formData(): { isMinor: boolean, isGroup: boolean } {
    return this.addStatisticsForm.value;
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
