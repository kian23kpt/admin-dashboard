import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableModel } from '@core/models';

@Component({
    selector: 'app-employee-edit-form',
    templateUrl: './employee-edit-form.component.html',
    styleUrls: ['./employee-edit-form.component.scss'],
})
export class EmployeeEditFormComponent implements OnInit {
    @Input() employeeData: TableModel;
    private _employeeForm = this.fb.group({
        name: [''],
        hourlyRate: [''],
        overtimeHourlyRate: [''],
        shifts: [''],
    });
    displayedColumns: string[] = ['shift', 'clockIn', 'clockOut', 'totalTime'];
    index: number[];

    constructor(private fb: FormBuilder) {}

    get employeeForm() {
        return this._employeeForm;
    }

    ngOnInit(): void {
        this.employeeForm.patchValue(this.employeeData);
    }
}
