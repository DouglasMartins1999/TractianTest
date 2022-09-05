import Route from "./route.interface";
import * as express from 'express';

export default interface Module {
    handleRequest?(route: Route): express.Handler;
    handleError?: express.ErrorRequestHandler;
}