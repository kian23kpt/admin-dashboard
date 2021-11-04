import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { TableModel } from '@core/models';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesEditDialogComponent } from '@feature/components';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '@core/services/employee.service';

@Component({
    selector: 'app-employees-table',
    templateUrl: './employees-table.component.html',
    styleUrls: ['./employees-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesTableComponent implements OnChanges {
    @Input() elementData: TableModel[];
    @Output() updateTable: EventEmitter<boolean> = new EventEmitter<boolean>();

    displayedColumns: string[] = [
        'select',
        'id',
        'name',
        'email',
        'totalClocked',
        'totalPaid',
        'totalOvertimePaid',
    ];
    dataSource: MatTableDataSource<TableModel>;
    selection = new SelectionModel<TableModel>(true, []);

    constructor(
        public _dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _employeeService: EmployeeService
    ) {}

    ngOnChanges() {
        this.dataSource = new MatTableDataSource<TableModel>(this.elementData);
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource?.data?.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: TableModel): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.id + 1
        }`;
    }

    openDialog() {
        if (!this.selection.isEmpty()) {
            const dialogRef = this._dialog.open(EmployeesEditDialogComponent, {
                width: '70vw',
                disableClose: true,
                data: this.selection.selected,
            });
            dialogRef.afterClosed().subscribe((result) => {
                result.forEach((employee: TableModel) => {
                    let body = {
                        name: employee.name,
                        hourlyRate: employee.hourlyRate,
                        overtimeHourlyRate: employee.overtimeHourlyRate,
                    };
                    this._employeeService
                        .employeeEdit(employee.id, body)
                        .subscribe();
                });
                this.selection.clear();
                this.updateTable.emit(true);
            });
        } else {
            this._snackBar.open(
                'Select at least One Employee for Edit',
                'Close',
                {
                    duration: 3000,
                }
            );
        }
    }
}
