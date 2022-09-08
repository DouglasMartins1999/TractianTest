import { Request } from "express";
import Reply from "../../tools/reply.handler";
import Service from "../../tools/service.handler";

import assetsRepository from "./assets.repository";
import Asset from "./assets.domain";

class AssetService extends Service {
    async fetch(ctx: Request) {
        const { company, id } = ctx.params;
        const action = await assetsRepository.select(company, id);

        return new Reply(Reply.codes.OK, action[0]?.assets).setListBehavior(!!id, true);
    }

    async create(ctx: Request) {
        const { company } = ctx.params;
        const asset = new Asset(ctx.body).validate(Asset.creationSchema);
        const action = await assetsRepository.insert(company, asset);

        const body = { id: asset["_id"] };
        const status = action.modifiedCount 
            ? Reply.codes.CREATED 
            : Reply.codes.BADREQUEST;
        
        return new Reply(status, body);  
    }

    async update(ctx: Request) {
        const { company, id } = ctx.params;
        const asset = new Asset(ctx.body).validate();
        const action = await assetsRepository.update(company, asset, id);

        const body = action?.value?.members?.[0];
        const status = body
            ? Reply.codes.ACCEPTED 
            : Reply.codes.NOTFOUND;
        
        return new Reply(status, body);
    }

    async remove(ctx: Request) {
        const { company, id } = ctx.params;
        const action = await assetsRepository.delete(company, id);

        const body = { deletedAmount: action?.upsertedCount };
        const status = Reply.codes.NOCONTENT;

        return new Reply(status, body);
    }
}

export default new AssetService();

