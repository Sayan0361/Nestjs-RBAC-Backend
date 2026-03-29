import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validation Pipe 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove any property that is not defined in the DTO
      forbidNonWhitelisted: true, // Now instead of stripping extra fields, NestJS throws an error
      transform: true, // This converts incoming JSON into actual DTO class instances.
      disableErrorMessages: false, // Expose validation details to the client
    })
  );
  
  // ClassSerializerInterceptor to apply @Exclude() and @Expose() decorators
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  
  // u can use @UsePipes(new ValidationPipe({whiteList:true,forbidNonWhitelisted:true})) decorator to particularly add validation to only 1 controller

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
