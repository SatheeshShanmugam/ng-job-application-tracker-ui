import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, TimeoutError } from 'rxjs';
import { ApiError } from '../../core/pages/api-response.model';

@Injectable(
  { providedIn: 'root' }
)
export class GlobalErrorHandlerService implements ErrorHandler {
  private resError: ApiError[] = [];
  private apiError: ApiError = <ApiError>{};
  constructor() {}

  public handleError(error: Error | HttpErrorResponse) {

    debugger;

    //Timeout Error
    if (error instanceof TimeoutError) {
      this.apiError.description = error.message;
      throw this.resError.push(this.apiError);
    }

    // Generic HTTP errors(Server Errors)
    if (error instanceof HttpErrorResponse) {
      this.apiError.code = error.status.toString()
      this.apiError.description = error.message;
      throw this.resError.push(this.apiError);
    }

    //Client Side Error
    if (error instanceof Error) {
      this.apiError.description = "An unknown error occurred at Client Side";
      throw this.resError.push(this.apiError);
    }
    throw this.resError;
  }

}

export const GlobalErrorHandlerServiceProviders = [
  { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
];

