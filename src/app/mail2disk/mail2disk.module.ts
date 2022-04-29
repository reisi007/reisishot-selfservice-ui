import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Mail2diskRoutingModule} from './mail2disk-routing.module';
import {Mail2diskComponent} from './mail2disk.component';
import {DisplayMailComponent} from './display-mail/display-mail.component';
import {Mail2DiskService} from './mail2-disk.service';
import {MailKVDisplayComponent} from './display-mail/mail-kv-display/mail-kv-display.component';


@NgModule({
  declarations: [
    Mail2diskComponent,
    DisplayMailComponent,
    MailKVDisplayComponent,
  ],
  providers: [Mail2DiskService],
  imports: [
    CommonModule,
    Mail2diskRoutingModule,
  ],
})
export class Mail2diskModule {
}
