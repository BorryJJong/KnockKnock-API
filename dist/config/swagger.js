"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerBuilder = void 0;
const swagger_1 = require("@nestjs/swagger");
function swaggerBuilder(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('녹녹')
        .setDescription('API DOCS')
        .setVersion('beta')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
}
exports.swaggerBuilder = swaggerBuilder;
//# sourceMappingURL=swagger.js.map