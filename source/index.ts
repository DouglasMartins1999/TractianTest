import * as express from "express";

import AuthModule from "./helpers/auth.module";
import ErrorModule from "./helpers/error.module";
import LogModule from "./helpers/logs.module";
import RouteModule from "./helpers/route.module";
import RouterSetup from "./tools/router.handler";

const server = express();

const routeConfig = new RouterSetup()
    .enableQueryParse()
    .enableJSONParse()
    .enableFormDataParse()
    .addModule(new AuthModule())
    .addModule(new RouteModule())
    .addModule(new LogModule(LogModule.ViaConsole))
    .addModule(new ErrorModule())
    .init();

server.use(routeConfig.router);
server.listen(process.env.PORT, () => console.info("Server started:", process.env.PORT))