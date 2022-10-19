import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import * as cors from 'cors';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './db/data-source';
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    dataSource.initialize();
  }
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
