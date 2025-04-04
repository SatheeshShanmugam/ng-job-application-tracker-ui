// job-application.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import * as JobApplicationActions from './job-applications.action';
import { JobApplicationDetails } from '../../pages/job-application-detail.model';
import { ApiError, ApiResponse } from '../../pages/api-response.model';


export interface IJobApplicationState extends ApiResponse {
}

export const initialState: IJobApplicationState = {
  data: null,
  IsSuccess: false,
  errors: null
};

export const JobApplicationReducers = createReducer(
  initialState,
  on(JobApplicationActions.loadJobApplications, (state) => ({
    ...state,
    IsSuccess: true,
    errors: [],
  })),
  on(JobApplicationActions.loadJobApplicationsSuccess, (state, { response }) => ({
    ...state,
    data: response.data,
    IsSuccess: false
  })),

  on(JobApplicationActions.submitJobApplication, (state) => ({
    ...state,
    IsSuccess: true,
    errors: null
  })),

  on(JobApplicationActions.submitJobApplicationSuccess, (state, { response }) => ({
    ...state,
    IsSuccess: false,
    data: [...(state.data || []), ...(response.data || [])],
    errors: null
  })),

  on(JobApplicationActions.updateApplicationSuccess, (state, { response }) => {
    
  if (!state.data || !response?.data?.length) return state;
  
  const updatedApp = response.data[0];

  const updatedData = state.data.map(app => 
    app.id === updatedApp.id ? { ...app, ...updatedApp } : app
  );
  
  return {
    ...state,
    data: updatedData,
    isSuccess: true
  }

  }),

  on(JobApplicationActions.onJobApplicationsFailure, (state, { errors }) => ({
    ...state,
    errors,
    IsSuccess: false
  }))
);

