import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BaseService } from "./Base.service";
import { environment } from "../../../environments/environment";
import { catchError, map, Observable, throwError } from "rxjs";
import { ApiResponse } from "../models/api-response.model";


/// JobApplicationService is a service that provides methods to interact with the job application API.
/// It extends the BaseService class to inherit basic CRUD operations.
@Injectable({providedIn: 'root'})
export class JobApplicationService extends BaseService<ApiResponse>{
  private jobApplications: any[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
    this.baseUrl = this.baseUrl + '/JobApplication';
  }

  GetAllJobApplications() : Observable<ApiResponse> {    
    return this.getAll('GetAllJobApplications');
  }

  SubmitJobApplication(application: any): Observable<ApiResponse> {   
    return this.Add(application,'SubmitJobApplication');
  }

  UpdateJobApplication(updatedApplication: any) : Observable<ApiResponse> {    
    return this.update(updatedApplication,'UpdateJobApplication');
  }  

}