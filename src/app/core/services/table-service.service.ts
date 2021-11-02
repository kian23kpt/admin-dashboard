import { Injectable } from '@angular/core';
import { AbstractRESTService } from '@core/templates/ddx-rest.template';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableModel } from '@core/models';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TableServiceService extends AbstractRESTService {
    constructor(protected http: HttpClient) {
        super(http);
    }

    getTableData(): Observable<TableModel[]> {
        return this.httpGET('employees').pipe(delay(300)) as Observable<
            TableModel[]
        >;
    }
}
