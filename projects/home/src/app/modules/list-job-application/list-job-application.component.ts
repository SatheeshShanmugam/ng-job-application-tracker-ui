import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { BaseClass, WithDestroy } from '../../shared/utils/base-class';
import { JobApplicationService } from '../../core/services/JobApplication.service';
import { map, Observable, of } from 'rxjs';
import { ApiError, UpdateJobApplicationRequest } from '../../core/models/api-response.model';
import { Store } from '@ngrx/store';
import { selectAllJobApplications, selectJobApplicationsError, selectJobApplicationsLoading } from '../../core/store/job-applications/job-applications.selectors';
import { loadJobApplications, updateApplication } from '../../core/store/job-applications/job-applications.action';
import { statusOptions } from '../../core/constants/status-options';
import { JobApplicationDetails } from '../../core/models/job-application-detail.model';

@Component({
  selector: 'app-list-job-application',
  standalone: false,
  templateUrl: './list-job-application.component.html',
  styleUrl: './list-job-application.component.scss'
})
export class ListJobApplicationComponent extends WithDestroy(BaseClass) implements OnInit, AfterViewInit {

  jobApplicationDetails$: JobApplicationDetails[] = [];
  jobApplicationDetails_status_dic: { [key: number]: string | number } = {};
  isSuccess$: Observable<boolean>;
  error$: Observable<ApiError[] | null>;
  jobApplicationsForm: FormGroup = null!;
  isModalOpen = false;
  statusOptions = statusOptions;

  
  constructor(private fb: FormBuilder, private store: Store) {
    super();
    this.jobApplicationsForm = this.fb.group({
      applications: this.fb.array([])
    });
    this.store.select(selectAllJobApplications).subscribe(data => {
      if (data) {
        this.jobApplicationDetails$ = data;
        this.createForm(data);
      }
    });
    this.isSuccess$ = this.store.select(selectJobApplicationsLoading);
    this.error$ = this.store.select(selectJobApplicationsError);

  }

  ngOnInit() {
    this.store.dispatch(loadJobApplications());
  }

  ngAfterViewInit() {
  }

  openModal() {
    debugger;
    this.isModalOpen = true;
  }

  onModalClosed() {
    this.isModalOpen = false;
    console.log('Modal was closed');
  }

  // This method is used to mark all controls in a form group as touched
  createForm(applications: JobApplicationDetails[]) {
    const formArray = this.jobApplicationsForm.get('applications') as FormArray;
    formArray.clear(); // Clear existing controls
    applications.forEach((app, index) => {
      formArray.push(
        this.fb.group({
          status: [app.status] // This will control the ng-select
        })
      );
      this.jobApplicationDetails_status_dic[index] = app.status
    });
  }

  trackByApplicationId(index: number, app: any): any {
    // Use a unique identifier if available, or fall back to index
    return app.id || index;
  }

  saveAll() {

    const formArray = this.jobApplicationsForm.get('applications') as FormArray;

    // Prepare the updates array
    const updates: JobApplicationDetails[] = formArray.controls.map((control, index) => ({
         ...this.jobApplicationDetails$[index],
         status: control.value['status'],
       }))
      .filter((obj, index) => {
        const newStatus = obj.status;
        const currentStatus = this.jobApplicationDetails_status_dic[index];
        return newStatus !== currentStatus;
      });     


    if (updates.length > 0) {
      // Create the properly formatted request
      const request: UpdateJobApplicationRequest<JobApplicationDetails> = {
        jobApplicationDetails: updates.map(update => ({
          ...update
        }))
      };

      this.store.dispatch(updateApplication({ updateJobApplicationRequest: request }));
    }

    
  }
}


