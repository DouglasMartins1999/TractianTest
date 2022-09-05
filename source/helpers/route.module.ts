import { Handler, Request, Response, NextFunction } from "express";
import Module from "../interfaces/module.interface";
import Route from "../interfaces/route.interface";
import Reply from "../tools/reply.handler";

import { statuscode } from "../settings/alerts.conf";

export default class RouteModule implements Module {
    handleRequest(route: Route): Handler {
        return async (req: Request, res: Response, next: NextFunction) => {
            const response = await Promise.resolve(route.handledBy(req));
            const fallback = {
                status: response?.payload ? Reply.codes.OK : Reply.codes.SERVERERROR,
				payload: { error: statuscode[response?.code], ...response?.error ?? {} }
            }
            
			if(!response)
				return next();

            res.locals.spec = route;
			res.header(response.headers ?? {});
			res.status(response.code ?? fallback.status);
			res.send(response.payload ?? fallback.payload);
			return next();
        }
    }
}