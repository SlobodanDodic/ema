import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeInput } from './dto/employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

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

  @Query(() => [Employee], { name: 'findAllEmployees' })
  findAllEmployees() {
    return this.employeeService.findAllEmployees();
  }

  @Query(() => Employee, { name: 'findOneEmployee' })
  findOneEmployee(@Args('id') id: string) {
    return this.employeeService.findOneEmployee(id);
  }
}
