import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableModel } from '@core/models';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-employees-edit-dialog',
    templateUrl: './employees-edit-dialog.component.html',
    styleUrls: ['./employees-edit-dialog.component.scss'],
})
export class EmployeesEditDialogComponent {
    private _employeeForm: FormGroup = new FormGroup({
        formArray: this._formBuilder.array([]),
    });
    displayedColumns: string[] = ['shift', 'clockIn', 'clockOut', 'totalTime'];

    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: TableModel[]
    ) {
        this.buildForm();
    }

    buildForm() {
        const controlArray = this.employeeForm.get('formArray') as FormArray;

        Object.keys(this.data).forEach((i: any) => {
            controlArray.push(
                this._formBuilder.group({
                    id: this.data[i].id,
                    name: this.data[i].name,
                    hourlyRate: this.data[i].hourlyRate,
                    overtimeHourlyRate: this.data[i].overtimeHourlyRate,
                })
            );
        });
    }

    get employeeForm() {
        return this._employeeForm;
    }

    formatDate(event: any) {
        let x = new Date();
        console.log(x);
        console.log(
            moment(event, 'ddd, HH:mm: A').diff(
                moment().startOf('d'),
                'millisecond'
            )
        );
    }
}
