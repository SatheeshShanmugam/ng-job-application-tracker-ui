import { JobApplicationDetails } from "./job-application-detail.model";
/// This interface is used to define the structure of the API response for job applications
export interface ApiResponse{
    data: JobApplicationDetails[] | null;
    IsSuccess: boolean;
    errors: ApiError[] | null;
}

export interface ApiError{
code?: string;
description: string;
}
/// This interface is used to update the job application details in the store
export interface UpdateJobApplicationRequest<T> {
    jobApplicationDetails: T[];
}

