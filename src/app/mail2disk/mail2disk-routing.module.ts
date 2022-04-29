import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Mail2diskComponent} from './mail2disk.component';

const routes: Routes = [{path: '', component: Mail2diskComponent, data: {title: 'Mail 2 Disk Anzeige'}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Mail2diskRoutingModule {
}
