import * as express from "express";
import * as multer from "multer";
import * as path from "path";
import * as parser from "auto-parse";

import Module from "../interfaces/module.interface";
import Route from "../interfaces/route.interface";
import utils from "./utils.handler";

export default class RouterSetup {
    public modules: Module[] = [];
    public router: express.Router = express.Router();

    addModule(module: Module) {
        this.modules.push(module);
        return this;
    }

    enableJSONParse() {
        this.router.use(express.json());
        return this;
    }

    enableFormDataParse(options?: multer.Options) {
        this.router.use(multer(options).any());
        return this;
    }

    enableQueryParse() {
        const middleware = (req, _, next) => {
            req.rawQuery = req.query;
            Object.defineProperty(req, "query", { value: parser(req.query) })
            return next();
        }

        this.router.use(middleware);
        return this;
    }

    init() {
        const files = utils.fileFinder("./source/entities", new RegExp("\\.routes\\.ts$"));
        const routes: Route[] = files.map(f => require(path.resolve(f)).default).flat();

        routes.forEach(route => this.modules.filter(m => !!m.handleRequest).forEach(module => {
            this.router[route.method.toLowerCase()](route.path, module.handleRequest(route));
        }))

        this.modules.filter(m => m.handleError).forEach(module => {
            this.router.use(module.handleError);
        })

        return this;
    }
}