import { Request } from "express";
import Reply from "../../tools/reply.handler";
import Service from "../../tools/service.handler";

import Company from "./companies.domain";
import companiesRepository from "./companies.repository";

class CompanyService extends Service {
    async fetch(ctx: Request) {
        const id = ctx.params.id;
        const result = await companiesRepository.select(id);

        return new Reply(Reply.codes.OK, result).setListBehavior(!!id, true);
    }

    async create(ctx: Request) {
        const company = new Company(ctx.body).validate(Company.creationSchema);
        const result = await companiesRepository.insert(company);
        
        return new Reply(Reply.codes.CREATED, { id: result?.insertedId });  
    }

    async update(ctx: Request) {
        const id = ctx.params.id;
        const company = new Company(ctx.body).validate();
        const result = await companiesRepository.update(company, id);
        
        return new Reply(Reply.codes.ACCEPTED, { id: result?.upsertedId });
    }

    async remove(ctx: Request) {
        const id = ctx.params.id;
        const result = await companiesRepository.delete(id);

        return new Reply(Reply.codes.NOCONTENT, { id: result?.deletedCount });
    }
}

export default new CompanyService();