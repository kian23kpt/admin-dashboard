import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableModel } from '@core/models';

@Component({
    selector: 'app-employees-edit-dialog',
    templateUrl: './employees-edit-dialog.component.html',
    styleUrls: ['./employees-edit-dialog.component.scss'],
})
export class EmployeesEditDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: TableModel[]) {}
}
