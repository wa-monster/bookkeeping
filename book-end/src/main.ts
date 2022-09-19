import { ValidationPipe, VersioningType, VERSION_NEUTRAL } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exceptions.filer';
import { HttpExceptionsFilter } from './common/exceptions/http.exceptions.filter';

// 换成Fastify框架
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { generateDocument } from './doc';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionsFilter());

  app.useGlobalInterceptors(new TransformInterceptor());
  // 接口版本化管理
  // 可以全局配置请求控制
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });
  // 启动全局字段 校验，保证请求接口字段校验正确
  app.useGlobalPipes(new ValidationPipe())

  // 创建文档
  generateDocument(app);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000);
}
bootstrap();
