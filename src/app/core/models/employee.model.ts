import { Shift } from '@core/models/shift.model';

export interface Employee {
    id: number;
    name: string;
    email: string;
    hourlyRate: number;
    overtimeHourlyRate: number;
    shifts: Array<Shift>;
}
