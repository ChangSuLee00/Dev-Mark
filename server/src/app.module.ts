import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as Joi from 'joi';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { BoxModule } from './box/box.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AlarmModule } from './alarm/alarm.module';
import { FeedModule } from './feed/feed.module';
import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: process.env.NODE_ENV === 'dev' ? 'dev' : 'test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      // pord 환경일 때는 configModuel이 환경변수 파일을 무시
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      // entities: ['src/**/*.entity{.ts,.js}'] load
      synchronize: true,
      // 변경사항 업데이트
      dropSchema: true,
      // row 삭제
      // --> typeORM 오류로 인해 synchronize와 dropSchema는 동일하게 설정 해야 한다.
      // logging: true,
      entities: ['src/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    AuthModule,
    BoxModule,
    BookmarkModule,
    AlarmModule,
    FeedModule,
    GptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
