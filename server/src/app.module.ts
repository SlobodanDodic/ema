import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { PaymentModule } from './payment/payment.module';
import { LiabilityModule } from './liability/liability.module';
import { BenefitModule } from './benefit/benefit.module';
import { JobsModule } from './jobs/jobs.module';
import { CalculationModule } from './calculation/calculation.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule,
    AuthModule,
    EmployeeModule,
    PaymentModule,
    LiabilityModule,
    BenefitModule,
    JobsModule,
    CalculationModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.prismaService.$connect();
    console.log('Connected to DB');
  }
}
