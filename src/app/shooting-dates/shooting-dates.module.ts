import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShootingDatesViewComponent} from './shooting-dates-view/shooting-dates-view.component';
import {
  ShootingDateCellComponent,
} from './shooting-dates-view/shooting-date-view-public/shooting-date-public-cell/shooting-date-cell.component';
import {ShootingDateViewPublicComponent} from './shooting-dates-view/shooting-date-view-public/shooting-date-view-public.component';
import {LoadingIndicatorModule} from '../loading-indicator/loading-indicator.module';


@NgModule({
  declarations: [
    ShootingDatesViewComponent,
    ShootingDateCellComponent,
    ShootingDateViewPublicComponent,
  ],
  exports: [
    ShootingDatesViewComponent,
    ShootingDateViewPublicComponent,
    ShootingDateCellComponent,
  ],
  imports: [
    CommonModule,
    LoadingIndicatorModule,
  ],
})
export class ShootingDatesModule {
}
