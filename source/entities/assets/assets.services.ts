import { Request } from "express";
import Reply from "../../tools/reply.handler";
import Service from "../../tools/service.handler";

import assetsRepository from "./assets.repository";
import Asset from "./assets.domain";
import { Binary } from "mongodb";

class AssetService extends Service {
    async fetch(ctx: Request) {
        const { company, id } = ctx.params;
        const action = await assetsRepository.select(company, id);
        
        const body = action
            .map((a: any) => a.assets).flat()
            .map((a: any) => ({ ...a, picture: undefined }));

        return new Reply(Reply.codes.OK, body).setListBehavior(!!id, true);
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

        const body = action?.value?.["assets"]?.[0];
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

    async attachPicture(ctx: Request) {
        const { company, id } = ctx.params;
        
        const file = [ ...(ctx.files as any[]) ].find(f => f.fieldname === "image");
        const action = await assetsRepository.binaries(company, id, "picture", file?.buffer);

        return new Reply(Reply.codes.CREATED, action);
    }

    async fetchPicture(ctx: Request) {
        const { company, id } = ctx.params;
        const action = await assetsRepository.select(company, id);

        const body = action
            .map((a: any) => a.assets).flat()
            .map((a: any) => a.picture)
            .map((a: Binary) => a.buffer)[0];

        // Melhorias: Salvar o MimeType da Imagem para retornar ao navegador
        return new Reply(Reply.codes.OK, body);
    }
}

export default new AssetService();

