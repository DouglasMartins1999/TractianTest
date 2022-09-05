import { Request } from 'express';
import Reply from '../tools/reply.handler';

export default interface Route {
    path: string,
    method: string,
    description: string,
    handleFiles?: boolean,
    ignoreLogger?: string,
    authNeeded?: boolean,
    handledBy: (IncomingRequest: Request) => Reply | Promise<Reply>,
}