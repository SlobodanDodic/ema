import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class TasksService {
  constructor(private readonly employeeService: EmployeeService) {}

  @Cron('0 0 1 * *') // Runs at midnight on the first of every month
  async handleCron() {
    await this.employeeService.checkAndPerformCalculation();
  }
}
