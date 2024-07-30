import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { PaymentInput } from './dto/payment.input';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  createPayment(@Args('data') data: PaymentInput) {
    return this.paymentService.createPayment(data);
  }

  @Query(() => [Payment], { name: 'paymentsByEmployee' })
  paymentsByEmployee(@Args('employeeId') employeeId: string) {
    return this.paymentService.paymentsByEmployee(employeeId);
  }

  @Query(() => [Payment], { name: 'getAllPayments' })
  getAllPayments() {
    return this.paymentService.getAllPayments();
  }
}
