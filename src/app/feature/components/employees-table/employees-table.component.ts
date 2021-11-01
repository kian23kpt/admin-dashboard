import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Table } from '@core/models';

const ELEMENT_DATA: Table[] = [
    {
        id: 1,
        name: 'Hydrogen',
        totalClocked: 1.0079,
        totalPaid: 1.0079,
        totalOvertimePaid: 12,
        email: 'test@test',
    },
    {
        id: 2,
        name: 'Helium',
        totalClocked: 4.0026,
        totalPaid: 1.0079,
        totalOvertimePaid: 12,
        email: 'test@test',
    },
    {
        id: 3,
        name: 'Lithium',
        totalClocked: 6.941,
        totalPaid: 1.0079,
        totalOvertimePaid: 12,
        email: 'test@test',
    },
    {
        id: 4,
        name: 'Beryllium',
        totalClocked: 9.0122,
        totalPaid: 1.0079,
        totalOvertimePaid: 12,
        email: 'test@test',
    },
    {
        id: 5,
        name: 'Boron',
        totalClocked: 10.811,
        totalPaid: 1.0079,
        totalOvertimePaid: 12,
        email: 'test@test',
    },
    {
        id: 6,
        name: 'Carbon',
        totalClocked: 12.0107,
        totalPaid: 1.0079,
        totalOvertimePaid: 12,
        email: 'test@test',
    },
    {
        id: 7,
        name: 'Nitrogen',
        totalClocked: 14.0067,
        totalPaid: 1.0079,
        totalOvertimePaid: 12,
        email: 'test@test',
    },
    {
        id: 8,
        name: 'Oxygen',
        totalClocked: 15.9994,
        totalPaid: 1.0079,
        totalOvertimePaid: 12,
        email: 'test@test',
    },
    {
        id: 9,
        name: 'Fluorine',
        totalClocked: 18.9984,
        totalPaid: 1.0079,
        totalOvertimePaid: 12,
        email: 'test@test',
    },
    {
        id: 10,
        name: 'Neon',
        totalClocked: 20.1797,
        totalPaid: 1.0079,
        totalOvertimePaid: 12,
        email: 'test@test',
    },
];

@Component({
    selector: 'app-employees-table',
    templateUrl: './employees-table.component.html',
    styleUrls: ['./employees-table.component.scss'],
})
export class EmployeesTableComponent {
    displayedColumns: string[] = [
        'select',
        'id',
        'name',
        'email',
        'totalClocked',
        'totalPaid',
        'totalOvertimePaid',
    ];
    dataSource = new MatTableDataSource<Table>(ELEMENT_DATA);
    selection = new SelectionModel<Table>(true, []);

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
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
    checkboxLabel(row?: Table): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.id + 1
        }`;
    }
}
