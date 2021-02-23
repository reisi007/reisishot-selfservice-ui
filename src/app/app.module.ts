import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CreateContractComponent} from './contract/create-contract/create-contract.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PersonComponent} from './contract/create-contract/person/person.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PrettyFilenamePipe} from './contract/create-contract/pretty-filename/pretty-filename.pipe';
import {DisplayContractComponent} from './contract/display-contract/display-contract.component';
import {MarkdownPipe} from './commons/markdown/markdown.pipe';
import {HttpErrorInterceptor} from './commons/HttpErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    CreateContractComponent,
    PersonComponent,
    PrettyFilenamePipe,
    DisplayContractComponent,
    MarkdownPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
