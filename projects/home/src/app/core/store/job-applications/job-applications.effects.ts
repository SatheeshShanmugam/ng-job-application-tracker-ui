// job-application.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import *  as actions from './job-applications.action';
import { JobApplicationService } from '../../services/JobApplication.service';
import { ApiResponse } from '../../models/api-response.model';



@Injectable({ providedIn: 'root' })
export class JobApplicationEffects {

  private actions$ = inject(Actions); // Alternative injection

  constructor(private jobApplicationService: JobApplicationService) { }

  loadJobApplications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadJobApplications),
      switchMap(() =>
        this.jobApplicationService.GetAllJobApplications().pipe(
          map((response: ApiResponse) =>actions.loadJobApplicationsSuccess({response : response})),
          catchError(errors =>of(actions.onJobApplicationsFailure({ errors })))
        ))));

  submitJobApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.submitJobApplication),
      switchMap(({ jobApplicationDetail }) =>
        this.jobApplicationService.SubmitJobApplication(jobApplicationDetail).pipe(
          map((response: ApiResponse) =>  actions.submitJobApplicationSuccess({ response:response })),
          catchError(errors =>of(actions.onJobApplicationsFailure({ errors})))
        ))));

  updateJobApplication$ = createEffect(() => this.actions$.pipe(
    ofType(actions.updateApplication),
    switchMap(({ updateJobApplicationRequest }) => this.jobApplicationService.UpdateJobApplication(updateJobApplicationRequest).pipe(
      map((response:ApiResponse) => actions.updateApplicationSuccess({ response : response})),
      catchError(error => {
        debugger;
        return of(actions.onJobApplicationsFailure({ errors:error}));})
    ))));






}