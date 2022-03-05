import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShootingDatesViewComponent} from './shooting-dates-view/shooting-dates-view.component';


@NgModule({
  declarations: [
    ShootingDatesViewComponent,
  ],
  exports: [
    ShootingDatesViewComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ShootingDatesModule {
}
