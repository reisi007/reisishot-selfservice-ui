import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CreateContractComponent} from './contract/create/create-contract/create-contract.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PersonComponent} from './contract/create/create-contract/person/person.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateContractComponent,
    PersonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
