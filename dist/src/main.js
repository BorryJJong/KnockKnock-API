"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./config/swagger");
require("dotenv/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, swagger_1.swaggerBuilder)(app);
    await app.listen(process.env.APP_PORT, () => {
        console.log(`[ 녹녹 ] Server listening on port : ${process.env.APP_PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map