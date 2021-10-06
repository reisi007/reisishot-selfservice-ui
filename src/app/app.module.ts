import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpErrorInterceptor} from './HttpErrorInterceptor';
import {MatomoModule} from 'ngx-matomo';
import {AppRoutingModule} from './app-routing.module';
import {OverviewComponent} from './overview/overview.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
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
  exports: [],
})
export class AppModule {
}
