import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { EmployeeInput } from './dto/employee.input';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Mutation(() => Employee)
  createEmployee(@Args('data') data: EmployeeInput) {
    return this.employeeService.createEmployee(data);
  }

  @Query(() => [Employee], { name: 'findAllEmployees' })
  findAllEmployees() {
    return this.employeeService.findAllEmployees();
  }
}
