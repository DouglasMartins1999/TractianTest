import { Request } from "express";
import Reply from "../../tools/reply.handler";
import Service from "../../tools/service.handler";

import User from "./users.domain";
import usersRepository from "./users.repository";

class UserService extends Service {
    async fetch(ctx: Request) {
        const id = ctx.params.id;
        const result = await usersRepository.select(id);

        return new Reply(Reply.codes.OK, result).setListBehavior(!!id, true);
    }

    async create(ctx: Request) {
        const user = new User(ctx.body).validate(User.creationSchema);
        const result = await usersRepository.insert(user);
        
        return new Reply(Reply.codes.CREATED, { id: result?.insertedId });  
    }

    async update(ctx: Request) {
        const id = ctx.params.id;
        const user = new User(ctx.body).validate();
        const result = await usersRepository.update(user, id);
        
        return new Reply(Reply.codes.ACCEPTED, { id: result?.upsertedId });
    }

    async remove(ctx: Request) {
        const id = ctx.params.id;
        const result = await usersRepository.delete(id);

        return new Reply(Reply.codes.NOCONTENT, { id: result?.deletedCount });
    }
}

export default new UserService();