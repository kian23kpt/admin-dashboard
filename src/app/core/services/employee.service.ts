import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableModel } from '@core/models';
import { delay } from 'rxjs/operators';
import { AbstractRESTService } from '@core/templates/ddx-rest.template';
import { Shift } from '@core/models/shift.model';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService extends AbstractRESTService {
    constructor(protected http: HttpClient) {
        super(http);
    }

    getTableData(): Observable<TableModel[]> {
        return this.httpGET('employees').pipe(delay(300)) as Observable<
            TableModel[]
        >;
    }

    getShiftsData(): Observable<Shift[]> {
        return this.httpGET('shifts').pipe(delay(400)) as Observable<Shift[]>;
    }
}
