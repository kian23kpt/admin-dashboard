import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModel } from '@core/models';
import { EmployeeService } from '@core/services/employee.service';
import { Shift } from '@core/models/shift.model';
import { Employee } from '@core/models/employee.model';
import { minsToStr } from '@core/util/statics';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    tableData: TableModel[];
    employees: Employee[];
    workTimeInMin: number = 480;
    private _subscription: Subscription;

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

    constructor(private _employeeService: EmployeeService) {}

    ngOnInit() {
        this.getEmployees();
    }

    getEmployees() {
        this._subscription = this._employeeService
            .getTableData()
            .subscribe((employees: TableModel[]) => {
                this.tableData = employees;
                this.calculateWorkingHour();
            });
    }

    calculateWorkingHour() {
        this.tableData.forEach((employee) => {
            let sum = 0;
            let overtime = 0;

            employee.shifts.forEach((shift: Shift) => {
                let clockIn = moment(shift.clockIn);
                let clockOut = moment(shift.clockOut);
                shift.clockIn = clockIn.format('ddd, hh:mm a');
                shift.clockOut = clockOut.format('ddd, hh:mm a');

                if (clockOut > clockIn) {
                    let result = clockOut.diff(clockIn, 'minute');
                    shift.workHour = minsToStr(result);
                    sum += result;
                    if (result > this.workTimeInMin) {
                        overtime += result - this.workTimeInMin;
                    }
                } else {
                    shift.workHour = 'Wrong Clock Out';
                }
            });
            employee.totalClocked = sum / 60;
            employee.totalPaid = sum * employee.hourlyRate;
            employee.totalOvertimePaid = overtime * employee.overtimeHourlyRate;

            this.calculateStats(
                sum,
                employee.totalPaid,
                employee.totalOvertimePaid
            );
        });
    }

    calculateStats(time: number, paid: number, overPaid: number) {
        this.stats.employee.totalValue = this.tableData.length;
        this.stats.time.totalValue += time / 60;
        this.stats.paid.totalValue += paid;
        this.stats.overPaid.totalValue += overPaid;
    }

    updateTable() {
        this.stats.time.totalValue = 0;
        this.stats.paid.totalValue = 0;
        this.stats.overPaid.totalValue = 0;
        this.getEmployees();
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
