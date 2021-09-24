import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CreateContractComponent} from './contract/create-contract/create-contract.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PersonComponent} from './contract/create-contract/person/person.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PrettyFilenamePipe} from './contract/create-contract/pretty-filename/pretty-filename.pipe';
import {DisplayContractComponent} from './contract/display-contract/display-contract.component';
import {MarkdownPipe} from './commons/markdown/markdown.pipe';
import {HttpErrorInterceptor} from './commons/HttpErrorInterceptor';
import {ResendContractAccessKeyComponent} from './contract/resend-contract-access-key/resend-contract-access-key.component';
import {PreviewContractComponent} from './contract/preview-contract/preview-contract.component';
import {WaitlistComponent} from './waitlist/waitlist/waitlist.component';
import {WaitlistPersonComponent} from './waitlist/waitlist-person/waitlist-person.component';
import {WaitlistItemComponent} from './waitlist/waitlist-item/waitlist-item.component';
import {MatomoModule} from 'ngx-matomo';
import {AppRoutingModule} from './app-routing.module';
import {WaitlistAdminComponent} from './waitlist/waitlist-admin/waitlist-admin.component';
import {WaitlistAdminItemComponent} from './waitlist/waitlist-admin/waitlist-admin-item/waitlist-admin-item.component';
import {ChangePwdComponent} from './change-pwd/change-pwd.component';
import {OverviewComponent} from './overview/overview.component';
import {RatingComponent} from './review/rating/rating.component';
import {ReviewComponent} from './review/review.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateContractComponent,
    PersonComponent,
    PrettyFilenamePipe,
    DisplayContractComponent,
    MarkdownPipe,
    ResendContractAccessKeyComponent,
    PreviewContractComponent,
    WaitlistComponent,
    WaitlistPersonComponent,
    WaitlistItemComponent,
    WaitlistAdminComponent,
    WaitlistAdminItemComponent,
    ChangePwdComponent,
    OverviewComponent,
    RatingComponent,
    ReviewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatomoModule.forRoot({
      scriptUrl: '//analytics.reisishot.pictures/matomo.js',
      trackers: [
        {
          trackerUrl: '//analytics.reisishot.pictures/matomo.php',
          siteId: 8,
        },
      ],
      routeTracking: {
        enable: true,
      },
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
