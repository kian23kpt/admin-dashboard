import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableModel } from '@core/models';
import { delay } from 'rxjs/operators';
import { AbstractRESTService } from '@core/templates/ddx-rest.template';

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

    employeeEdit(id: number, body: object) {
        return this.httpPATCH(`employees/${id}`, body);
    }
}
