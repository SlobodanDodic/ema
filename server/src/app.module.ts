import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { PaymentModule } from './payment/payment.module';
import { LiabilityModule } from './liability/liability.module';
import { Liability } from './liability/entities/liability.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [Liability], // Explicitly register the Liability type
      },
    }),
    PrismaModule,
    AuthModule,
    EmployeeModule,
    PaymentModule,
    LiabilityModule,
  ],
  providers: [],
})
export class AppModule {}
