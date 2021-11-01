import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../pages';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
    EmployeesTableComponent,
    InformationCardComponent,
} from '@feature/components';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
];

@NgModule({
    declarations: [
        DashboardComponent,
        EmployeesTableComponent,
        InformationCardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        //Material Modules
        MatCardModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
    ],
})
export class MainModule {}
