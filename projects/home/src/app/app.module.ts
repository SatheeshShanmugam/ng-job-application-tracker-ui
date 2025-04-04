import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalHttpInterceptorProviders } from './core/interceptors/httpconfig.interceptor';
import { GlobalErrorHandlerServiceProviders } from './shared/services/error-handler.service';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListJobApplicationComponent } from './modules/list-job-application/list-job-application.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JobApplicationEffects } from './core/store/job-applications/job-applications.effects';
import { AddJobApplicationComponent } from './modules/add-job-application/add-job-application.component';
import { jobApplicationFeatureKey } from './core/store/job-applications/job-applications.selectors';
import { JobApplicationReducers } from './core/store/job-applications/job-applications.reducers';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    AppComponent,
    ListJobApplicationComponent,
    AddJobApplicationComponent    
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,  
    StoreModule.forRoot({[jobApplicationFeatureKey]: JobApplicationReducers}),
    EffectsModule.forRoot([JobApplicationEffects]),
    ReactiveFormsModule,
    BrowserAnimationsModule, // Required for animations
    TableModule,
    DropdownModule,
    ButtonModule       
  ],
  providers: [
    GlobalErrorHandlerServiceProviders,   
    GlobalHttpInterceptorProviders,
    { provide: 'BASE_URL', useValue: 'https://localhost:44356/api' }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




