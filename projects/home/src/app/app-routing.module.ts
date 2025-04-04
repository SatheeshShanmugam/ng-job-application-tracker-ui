import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListJobApplicationComponent } from './modules/list-job-application/list-job-application.component';

const routes: Routes = [ 
  { 
    path: '', 
    component: ListJobApplicationComponent
  },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
