import { ObjectId } from "mongodb";
import startQueryOn from "../../settings/database.conf";
import ArrayRepository from "../../tools/repo.handler";
import Sensor from "./sensors.domain";

export class SensorRepository {
    public repo: ArrayRepository;

    constructor(public collection: string){
        this.repo = new ArrayRepository(collection);
    }

    async insert(company: string, asset: string, sensor: Sensor) {
        // Melhorias: Fazer operação de consulta também dentro do bulk
        const query = await this.select(company, asset);
        const current = query[0]?.["assets"]?.[0]?.["sensors"]?.["current"];

        const filter = { _id: new ObjectId(company), assets: { $elemMatch: { _id: new ObjectId(asset) } } };
        const actions = [
            { $push: { "assets.$.sensors.previous": current } },
            { $set: { "assets.$.sensors.current": {} } },
            { $set: sensor.keysWithPrefix("assets.$.sensors.current.") },
        ];

        return startQueryOn(this.collection)
            .bulkWrite(actions.map(update => ({ updateOne: { filter, update } })))
    }

    select(company: string, asset: string) {
        const query: any = { _id: new ObjectId(company), assets: { $elemMatch: { _id: new ObjectId(asset) } } };
        const options: any = { projection: { "assets.$": 1 } }

        return this.repo.select(query, options);
    }

    update(company: string, asset: string, sensor: Sensor) {
        const query = { _id: new ObjectId(company), assets: { $elemMatch: { _id: new ObjectId(asset) } } };
        const update = { $set: sensor.keysWithPrefix("assets.$.sensors.current.") }

        return this.repo.update(query, update, { $getField: "assets.$.sensors.current" });
    }

    delete(company: string, asset: string){
        const query = { _id: new ObjectId(company), assets: { $elemMatch: { _id: new ObjectId(asset) } } };
        const update = [
            { $push: { "assets.$.sensors.previous": "assets.$.sensors.current" }},
            { $set: { "assets.$.sensors.current": null } },
        ];

        return this.repo.delete(query, update);
    }
}

export default new SensorRepository("companies");