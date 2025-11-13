import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './resources/auth/auth.module';
import { CaslModule } from './resources/auth/casl/casl.module';
import { ForgotPasswordModule } from './resources/auth/forgot-password/forgot-password.module';
import { InventoryStocksModule } from './resources/inventory-stocks/inventory-stocks.module';
import { SubTask } from './resources/sub-tasks/sub-tasks.entity';
import { SubTasksModule } from './resources/sub-tasks/sub-tasks.module';
import { Task } from './resources/tasks/tasks.entity';
import { TasksModule } from './resources/tasks/tasks.module';
import { TenantOnboardingModule } from './resources/tenant-onboarding/tenant-onboarding.module';
import { TenantOnboardingModule1 } from './resources/tenant-onboarding1/tenant-onboarding.module';
import { UsersModule } from './resources/users/users.module';
import { AuthMiddleware } from './shared/middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as
        | 'mysql'
        | 'mariadb'
        | 'postgres'
        | 'cockroachdb'
        | 'sqlite'
        | 'mssql'
        | 'sap'
        | 'oracle'
        | 'cordova'
        | 'nativescript'
        | 'react-native'
        | 'sqljs'
        | 'mongodb'
        | 'aurora-mysql'
        | 'aurora-postgres'
        | 'expo'
        | 'better-sqlite3'
        | undefined,
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      entities: [Task, SubTask],
      // synchronize: true,
    }),
    TypeOrmModule.forFeature([Task, SubTask]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    TasksModule,
    SubTasksModule,
    TenantOnboardingModule1,
    TenantOnboardingModule,
    AuthModule,
    UsersModule,
    CaslModule,
    InventoryStocksModule,
    ForgotPasswordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
