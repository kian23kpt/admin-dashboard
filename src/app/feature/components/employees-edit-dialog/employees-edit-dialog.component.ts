import {
    Component,
    Inject,
    OnInit,
} from '@angular/core';
import { Shift } from '@core/models/shift.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableModel } from '@core/models';
import { FormBuilder } from '@angular/forms';

const ELEMENT_DATA: Shift[] = [
    // { employeeId: 1, clockIn: 8, clockOut: 1.0079 },
    // { employeeId: 2, clockIn: 8, clockOut: 4.0026 },
    // { employeeId: 3, clockIn: 6, clockOut: 6.941 },
    // { employeeId: 4, clockIn: 8, clockOut: 9.0122 },
    // { employeeId: 5, clockIn: 9, clockOut: 10.811 },
    // { employeeId: 6, clockIn: 4, clockOut: 12.0107 },
    // { employeeId: 7, clockIn: 3, clockOut: 14.0067 },
    // { employeeId: 8, clockIn: 2, clockOut: 15.9994 },
    // { employeeId: 9, clockIn: 1, clockOut: 18.9984 },
    // { employeeId: 10, clockIn: 11, clockOut: 20.1797 },
];

@Component({
    selector: 'app-employees-edit-dialog',
    templateUrl: './employees-edit-dialog.component.html',
    styleUrls: ['./employees-edit-dialog.component.scss'],
})
export class EmployeesEditDialogComponent implements OnInit {
    private _employeeForm = this.fb.group({
        name: [''],
        hourlyRate: [''],
        overtimeHourlyRate: [''],
        shifts: [''],
    });
    displayedColumns: string[] = [
        'employeeId',
        'clockIn',
        'clockOut',
        'totalTime',
    ];
    dataSource = ELEMENT_DATA;

    get employeeForm() {
        return this._employeeForm;
    }

    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: TableModel[]
    ) {}

    ngOnInit() {
        this.data.forEach((employee) => {
            this.employeeForm.patchValue(employee);
        });
        console.log(this.data);
    }
}
