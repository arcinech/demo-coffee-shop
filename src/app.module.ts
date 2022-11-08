import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import * as cors from 'cors';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ProductsModule,
    UsersModule,
    OrdersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
      serveRoot: '/',
      exclude: ['/api*', '/auth*', '/assets*'],
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
