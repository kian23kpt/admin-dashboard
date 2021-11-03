import { Shift } from '@core/models/shift.model';

export interface TableModel {
    id: number;
    name: string;
    email: string;
    hourlyRate: number;
    overtimeHourlyRate: number;
    totalClocked: string;
    totalPaid: number;
    totalOvertimePaid: number;
    shifts: Array<Shift>;
}
