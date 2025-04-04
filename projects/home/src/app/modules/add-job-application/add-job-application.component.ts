import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseClass, WithDestroy } from "../../shared/utils/base-class";
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as actions from "../../core/store/job-applications/job-applications.action";
import { statusOptions } from "../../core/constants/status-options";
import { JobApplicationDetails } from "../../core/pages/job-application-detail.model";


@Component({
    selector: 'app-add-job-application-modal',
    standalone: false,
    templateUrl: './add-job-application.component.html',
    styleUrl: './add-job-application.component.scss'
})
export class AddJobApplicationComponent extends WithDestroy(BaseClass) implements OnInit, AfterViewInit {

    constructor(private store: Store, private fb: FormBuilder) {
        super();
    }
    override title = 'Add Job Application';
    @Input() isOpen = false;
    @Output() closed = new EventEmitter<void>();

    employmentForm: FormGroup = null!;
    statusOptions = statusOptions;

    close() {
        this.isOpen = false;
        this.closed.emit();
    }

    
    ngOnInit() {
        this.initializeForm();
    }

    ngAfterViewInit() {
        
    }

    initializeForm(): void {
        this.employmentForm = this.fb.group({
            companyName: ['', [Validators.required, Validators.maxLength(100)]],
            position: ['', [Validators.required, Validators.maxLength(100)]],
            status: [0, Validators.required]
        });
    }

    onSubmit(): void {
        this.close();
        if (this.employmentForm.valid) {
            const request: JobApplicationDetails = {
                ...this.employmentForm.value,
                status: Number(this.employmentForm.value.status),
            }
            this.store.dispatch(actions.submitJobApplication({ jobApplicationDetail: request }));
        } else {
            this.markFormGroupTouched(this.employmentForm);
        }
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }



}