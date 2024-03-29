import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WaitlistRoutingModule} from './waitlist-routing.module';
import {PreviewContractChooserComponent} from './preview-contract-chooser/preview-contract-chooser.component';
import {WaitlistComponent} from './waitlist/waitlist.component';
import {WaitlistPersonComponent} from './waitlist/waitlist-person/waitlist-person.component';
import {WaitlistItemComponent} from './waitlist/waitlist-item/waitlist-item.component';
import {MarkdownModule} from '../markdown/markdown.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SecureWaitlistAreaComponent} from './secure-waitlist-area/secure-waitlist-area.component';
import {UpdatePersonComponent} from './update-person/update-person.component';
import {ReferrerInfoTopComponent} from './referrer-info-top/referrer-info-top.component';
import {ReferralCustomerInfoComponent} from './referral-customer-info/referral-customer-info.component';
import {ContactMeComponent} from './contact-me/contact-me.component';
import {ReferralPerksComponent} from './referral-customer-info/referral-perks/referral-perks.component';
import {ShowAllContractsComponent} from './show-all-contracts/show-all-contracts.component';
import {LazyLoadingImageComponent} from './lazy-loading-image/lazy-loading-image.component';
import {ShootingDatesModule} from '../shooting-dates/shooting-dates.module';

@NgModule({
  declarations: [
    PreviewContractChooserComponent,
    WaitlistComponent,
    WaitlistPersonComponent,
    WaitlistItemComponent,
    SecureWaitlistAreaComponent,
    UpdatePersonComponent,
    ReferrerInfoTopComponent,
    ReferralCustomerInfoComponent,
    ContactMeComponent,
    ReferralPerksComponent,
    ShowAllContractsComponent,
    LazyLoadingImageComponent,
  ],
  imports: [
    CommonModule,
    WaitlistRoutingModule,
    MarkdownModule,
    ReactiveFormsModule,
    ShootingDatesModule,
  ],
})
export class WaitlistModule {
}
