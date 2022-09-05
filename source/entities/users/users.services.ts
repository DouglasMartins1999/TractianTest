import { Request } from "express";
import Reply from "../../tools/reply.handler";
import Service from "../../tools/service.handler";
import User from "./users.domain";

class UserService extends Service {
    fetch(ctx: Request): Reply {
        // new User({ mas: 12 }).validate();
        return new Reply(Reply.codes.OK, { msg: "Test", ...ctx.query })
    }
}

export default new UserService();