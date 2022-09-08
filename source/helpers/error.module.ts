import { NextFunction, Request, Response } from "express";
import Module from "../interfaces/module.interface";
import Reply from "../tools/reply.handler";
import * as alerts from "../settings/alerts.conf";

export default class ErrorModule implements Module {
    handleError(error: any, req: Request, res: Response, next: NextFunction) {
        let message = error, status = Reply.codes.BADREQUEST;

		if (error?.severity === "ERROR" && !error?.constraint) {
			error.statuscode = Reply.codes.SERVERERROR;
			error.constraint = "generic_db_error";
		}

		if (error?.message)
			message = error?.message;

		if (error?.constraint)
			message = alerts.constraints[error.constraint] ?? error;

		if (error?.details?.length)
			message = error.details[0].message;

        if (error.constructor.name === "AuthenticationError") {
            status = Reply.codes.UNAUTHORIZED;
            message = alerts.statuscode[status];
        }

        if (error.statuscode)
            status = error.statuscode;

        console.log(error);

        res.status(status);
        res.json({ info: message });
        return next();
    }
}