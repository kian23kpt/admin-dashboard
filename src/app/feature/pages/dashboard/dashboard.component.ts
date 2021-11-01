import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    generalData = [
        {
            title: 'Total Employees',
            value: '12 person',
            icon: 'perm_identity',
        },
        {
            title: 'Total Time',
            value: '1200 hr',
            icon: 'query_builder',
        },
        {
            title: 'Paid Amount',
            value: '12000 $',
            icon: 'attach_money',
        },
        {
            title: 'Overtime Paid Amount',
            value: '3000 $',
            icon: 'paid',
        },
    ];
}
