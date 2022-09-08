import { Request } from "express";
import Reply from "../../tools/reply.handler";
import Service from "../../tools/service.handler";

import User from "./users.domain";
import usersRepository from "./users.repository";

class UserService extends Service {
    async fetch(ctx: Request) {
        const { company, id } = ctx.params;
        const action = await usersRepository.select(company, id);

        return new Reply(Reply.codes.OK, action[0]?.["members"]).setListBehavior(!!id);
    }

    async create(ctx: Request) {
        const { company } = ctx.params;
        const user = new User(ctx.body).validate(User.creationSchema);
        const action = await usersRepository.insert(company, user);

        const body = { id: user["_id"] };
        const status = action.modifiedCount 
            ? Reply.codes.CREATED 
            : Reply.codes.BADREQUEST;
        
        return new Reply(status, body);  
    }

    async update(ctx: Request) {
        const { company, id } = ctx.params;
        const user = new User(ctx.body).validate();
        const action = await usersRepository.update(company, user, id);

        const changed = action?.lastErrorObject?.n;
        const status = changed
            ? Reply.codes.ACCEPTED 
            : Reply.codes.NOTFOUND;
        
        return new Reply(status, { changed });
    }

    async remove(ctx: Request) {
        const { company, id } = ctx.params;
        const action = await usersRepository.delete(company, id);

        const status = action?.modifiedCount 
            ? Reply.codes.NOCONTENT
            : Reply.codes.NOTFOUND;

        return new Reply(status, {});
    }
}

export default new UserService();