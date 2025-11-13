import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const gtPOS = async () => {
  const app = await NestFactory.create(AppModule);

  // Allow all origins (development only)
  app.enableCors({ origin: true, credentials: true });

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `🚀 Server is running on http://localhost:${process.env.PORT ?? 3000}/graphql`
    );
  });
};
gtPOS();
