// job-application.selectors.ts
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ApiResponse } from '../../pages/api-response.model'; 
import { IJobApplicationState, JobApplicationReducers } from './job-applications.reducers';
  
export const jobApplicationFeatureKey = 'JobApplications';

export const selectJobApplicationState = createFeatureSelector<IJobApplicationState>(jobApplicationFeatureKey);


export const selectAllJobApplications = createSelector(
  selectJobApplicationState,
  (state) => state.data // Adjust the type as needed   
);

export const selectJobApplicationsLoading = createSelector(
  selectJobApplicationState,
  (state) => state.IsSuccess
);

export const selectJobApplicationsError = createSelector(
  selectJobApplicationState,
  (state) => state.errors // Adjust the type as needed
);

  
