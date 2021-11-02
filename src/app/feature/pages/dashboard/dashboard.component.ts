import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '@core/services/table-service.service';
import { TableModel } from '@core/models';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    tableData: TableModel[];
    stats = {
        employee: {
            title: 'Total Employees',
            totalValue: 0,
            symbol: `person`,
            icon: 'perm_identity',
        },
        time: {
            title: 'Total Time',
            totalValue: 0,
            symbol: `hr`,
            icon: 'query_builder',
        },
        paid: {
            title: 'Paid Amount',
            totalValue: 0,
            symbol: '$',
            icon: 'attach_money',
        },
        overPaid: {
            title: 'Overtime Paid Amount',
            totalValue: 0,
            symbol: '$',
            icon: 'paid',
        },
    };

    constructor(private _tableService: TableServiceService) {}

    ngOnInit() {
        this._tableService
            .getTableData()
            .pipe(
                map((data) => {
                    this.tableData = data;
                    let totalEmployees = data.length;
                    let totalClocked = 0;
                    let totalPaid = 0;
                    let totalOvertimePaid = 0;
                    data.forEach((employee) => {
                        totalClocked += employee.totalClocked;
                        totalPaid += employee.totalPaid;
                        totalOvertimePaid += employee.totalOvertimePaid;
                        this.stats.employee.totalValue = totalEmployees;
                        this.stats.time.totalValue = totalClocked;
                        this.stats.paid.totalValue = totalPaid;
                        this.stats.overPaid.totalValue = totalOvertimePaid;
                    });
                })
            )
            .subscribe();
    }
}
