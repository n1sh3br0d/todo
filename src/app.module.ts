import {Module} from '@nestjs/common';
import {AuthModule} from './modules/auth/auth.module';
import {DatabaseModule} from './modules/database/database.module';
import {TodoModule} from './modules/todo/todo.module';

@Module({
  imports: [
    DatabaseModule, 
    ['ALL', 'AUTH'].includes(process.env.SERVICES) ? AuthModule : null, 
    ['ALL', 'TODO'].includes(process.env.SERVICES) ? TodoModule : null
  ].filter(Boolean),
  controllers: [],
  providers: [],
})
export class AppModule {}
