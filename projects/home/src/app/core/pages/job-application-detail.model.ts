import { JobApplicationStatus } from "../../shared/enums/enum";
/// This interface represents the details of a job application.
export interface JobApplicationDetails {
    id?: string;
    companyName?: string;
    position?: string;
    status: string | number;
    createdAt?: string | Date;
    updatedAt?: string | Date;    
}