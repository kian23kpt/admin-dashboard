import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { TableModel } from '@core/models';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesEditDialogComponent } from '@feature/components';

@Component({
    selector: 'app-employees-table',
    templateUrl: './employees-table.component.html',
    styleUrls: ['./employees-table.component.scss'],
})
export class EmployeesTableComponent implements OnChanges {
    @Input() elementData: TableModel[];

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

    constructor(public _dialog: MatDialog) {}

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
        const dialogRef = this._dialog.open(EmployeesEditDialogComponent, {
            width: '70vw',
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }
}
