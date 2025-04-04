// job-application.actions.ts
import { createAction, props } from '@ngrx/store';
import { JobApplicationDetails } from '../../pages/job-application-detail.model';
import { ApiError, ApiResponse, UpdateJobApplicationRequest } from '../../pages/api-response.model';

// Load Job Application
export const loadJobApplications = createAction(
  '[Job Application] Load Job Applications'
);

export const loadJobApplicationsSuccess = createAction(
  '[Job Application] Load Job Applications Success',
  props<{ response : ApiResponse }>()
);

// Add New Job Application
export const submitJobApplication = createAction(
  '[Job Application] Submit Job Application',
  props<{ jobApplicationDetail: JobApplicationDetails }>()
);

export const submitJobApplicationSuccess = createAction(
  '[Job Application] Submit Job Application Success',
  props<{ response: ApiResponse }>()
);

// Update Job Application
export const updateApplication = createAction(
  '[Job Application] Update Application',
  props<{ updateJobApplicationRequest: UpdateJobApplicationRequest<JobApplicationDetails>}>()
);

export const updateApplicationSuccess = createAction(
  '[Job Application] Update Application Success',
  props<{ response: ApiResponse}>()
);

// Common Failure while performing above task
export const onJobApplicationsFailure = createAction(
  '[Job Application]  load/add/update Failure',
  props<{ errors: ApiError[]| null }>()
);