import { Binary, ObjectId } from "mongodb";
import ArrayRepository from "../../tools/repo.handler";
import Asset from "./assets.domain";

export class AssetRepository {
    public repo: ArrayRepository;

    constructor(collection: string){
        this.repo = new ArrayRepository(collection);
    }

    insert(company: string, asset: Asset) {
        const query = { _id: new ObjectId(company) };
        const update = { $push: { assets: asset } };

        return this.repo.insert(query, update);
    }

    select(company: string, id?: string) {
        // Melhorias: Usar uma agregação para trazer apenas a informação sem a imagem
        const query: any = { _id: new ObjectId(company) };
        const options: any = { projection: { } }
        
        if(id) {
            query.assets = { $elemMatch: { _id: new ObjectId(id) } }
            options.projection["assets.$"] = 1
        } else {
            options.projection["assets"] = 1
        }

        return this.repo.select(query, options);
    }

    update(company: string, asset: Asset, id: string) {
        const query = { _id: new ObjectId(company), assets: { $elemMatch: { _id: new ObjectId(id) } } };
        const update = { $set: asset.keysWithPrefix("assets.$.") }

        return this.repo.update(query, update, { $getField: "assets.$" });
    }

    delete(company: string, id: string){
        const query = { _id: new ObjectId(company) };
        const update = { $pull: { assets: { _id: new ObjectId(id) } } }

        return this.repo.delete(query, update);
    }

    binaries(company: string, id: string, key: string, buffer: Buffer) {
        // Melhorias: Usar uma agregação para trazer apenas a imagem
        const query = { _id: new ObjectId(company), assets: { $elemMatch: { _id: new ObjectId(id) } } };
        const update = { $set: { ["assets.$." + key]: new Binary(buffer) } }

        return this.repo.update(query, update, { $getField: "assets.$." + key });
    }
}

export default new AssetRepository("companies");