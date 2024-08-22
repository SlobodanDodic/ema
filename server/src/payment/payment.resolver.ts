import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { PaymentInput } from './dto/payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  createPayment(@Args('data') data: PaymentInput) {
    return this.paymentService.createPayment(data);
  }

  @Mutation(() => Payment)
  updatePayment(
    @Args('id') id: string,
    @Args('data') data: UpdatePaymentInput,
  ) {
    return this.paymentService.updatePayment(id, data);
  }

  @Query(() => [Payment], { name: 'paymentsByEmployee' })
  paymentsByEmployee(@Args('employeeId') employeeId: string) {
    return this.paymentService.paymentsByEmployee(employeeId);
  }

  @Query(() => [Payment], { name: 'getAllPayments' })
  getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @Query(() => Float)
  async getTotalPaymentsByEmployee(@Args('employeeId') employeeId: string) {
    return this.paymentService.getTotalPaymentsByEmployee(employeeId);
  }
}
