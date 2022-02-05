import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

export function swaggerBuilder(app) {
  const config = new DocumentBuilder()
    .setTitle('녹녹')
    .setDescription('API DOCS')
    .setVersion('beta')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
