import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeInput } from './dto/employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import {
  HealthcareCategoryResponse,
  HealthcareStats,
} from './entities/healthcarestats.entity';
import { JobTitleResponse } from './entities/jobTitles.entity';
import {
  FitpassCategoryResponse,
  FitpassStats,
} from './entities/fitpassstats.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Mutation(() => Employee)
  createEmployee(@Args('data') data: EmployeeInput) {
    return this.employeeService.createEmployee(data);
  }

  @Mutation(() => Employee)
  async updateEmployee(
    @Args('id') id: string,
    @Args('data') data: EmployeeInput,
  ) {
    return this.employeeService.updateEmployee(id, data);
  }

  @Mutation(() => Employee)
  async deleteEmployee(@Args('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }

  @Query(() => [Employee], { name: 'getAllEmployees' })
  getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Query(() => Employee, { name: 'getOneEmployee' })
  getOneEmployee(@Args('id') id: string) {
    return this.employeeService.getOneEmployee(id);
  }

  @Query(() => HealthcareStats, { name: 'getEmployeesHealthcareStats' })
  getEmployeesHealthcareStats() {
    return this.employeeService.getEmployeesHealthcareStats();
  }

  @Query(() => FitpassStats, { name: 'getEmployeesFitpassStats' })
  async getEmployeesFitpassStats() {
    return this.employeeService.getEmployeesFitpassStats();
  }

  @Query(() => JobTitleResponse, { name: 'getJobTitleCounts' })
  async getJobTitleCounts() {
    return this.employeeService.getJobTitleCounts();
  }

  @Query(() => FitpassCategoryResponse, { name: 'getFitpassCategories' })
  async getFitpassCategories() {
    return this.employeeService.getFitpassCategories();
  }

  @Query(() => HealthcareCategoryResponse, { name: 'getHealthcareCategories' })
  async getHealthcareCategories() {
    return this.employeeService.getHealthcareCategories();
  }
}
