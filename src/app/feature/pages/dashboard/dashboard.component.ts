import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModel } from '@core/models';
import { EmployeeService } from '@core/services/employee.service';
import { Shift } from '@core/models/shift.model';
import { Employee } from '@core/models/employee.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    tableData: TableModel[];
    shifts: Shift[];
    employees: Employee[];
    workTimeInMin: number = 480;
    perHourPrice: number = 1;

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
        this.getShifts();
    }

    getEmployees() {
        this._employeeService.getTableData().subscribe((employees) => {
            this.tableData = employees;
        });
    }

    getShifts() {
        this._employeeService.getShiftsData().subscribe((res) => {
            this.shifts = res;
            this.mergeShiftsToEmployee();
        });
    }

    mergeShiftsToEmployee() {
        this.tableData.map((employee) => {
            const shifts: Array<Shift> = [];
            this.shifts.find((shift) => {
                if (shift.employeeId === employee.id) {
                    shifts.push(shift);
                }
            });
            employee.shifts = shifts;
        });
        this.calculateWorkingHour();
    }

    calculateWorkingHour() {
        this.tableData.forEach((employee) => {
            let sum = 0;
            let overtime = 0;

            employee.shifts.forEach((time) => {
                let clockIn = this.strToMins(time.clockIn);
                let clockOut = this.strToMins(time.clockOut);
                if (time.clockOut.split(':')[0] === '0' || clockOut > clockIn) {
                    let result = clockOut - clockIn;
                    sum += result;
                    if (result > this.workTimeInMin) {
                        overtime += result - this.workTimeInMin;
                    }
                }
            });
            employee.totalClocked = this.minsToStr(sum);
            employee.totalPaid = sum * this.perHourPrice;
            employee.totalOvertimePaid = overtime * this.perHourPrice;

            this.calculateStats(
                sum,
                employee.totalPaid,
                employee.totalOvertimePaid
            );
        });
    }

    strToMins(time: string) {
        let s = time.split(':');
        if (s[0] === '0') {
            s[0] = '24';
        }
        return Number(s[0]) * 60 + Number(s[1]);
    }

    minsToStr(time: number) {
        return Math.trunc(time / 60) + ':' + ('00' + (time % 60)).slice(-2);
    }

    calculateStats(time: number, paid: number, overPaid: number) {
        this.stats.employee.totalValue = this.tableData.length;
        this.stats.time.totalValue += time / 60;
        this.stats.paid.totalValue += paid;
        this.stats.overPaid.totalValue += overPaid;
    }

    ngOnDestroy(): void {
        console.log('x');
    }
}
