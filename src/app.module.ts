import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';

/**
 * This is the main app module, which configures TypeORM
 * to communicate with the DB instance
 */

@Module({
  imports: [ConfigModule.forRoot(), TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
