import { AnyBulkWriteOperation, ObjectId } from "mongodb";
import startQueryOn from "../../settings/database.conf";
import ArrayRepository from "../../tools/repo.handler";
import Sensor from "./sensors.domain";

export class SensorRepository {
    public repo: ArrayRepository;

    constructor(public collection: string){
        this.repo = new ArrayRepository(collection);
    }

    insert(company: string, asset: string, sensor: Sensor) {
        const query = { _id: new ObjectId(company), assets: { $elemMatch: { _id: new ObjectId(asset) } } };
        const update = [
            { $push: { "assets.$.sensors.previous": "assets.$.sensors.current" }},
            { $set: { "assets.$.sensors.current": sensor } },
        ];

        return this.repo.insert(query, update);
    }

    select(company: string, asset: string) {
        const query: any = { _id: new ObjectId(company), "assets._id": { _id: new ObjectId(asset) } };
        const options: any = { projection: { "assets.$.sensors": 1 } }

        return this.repo.select(query, options);
    }

    update(company: string, asset: string, sensor: Sensor) {
        const query = { _id: new ObjectId(company), "assets._id": new ObjectId(asset) };
        const update = { $set: sensor.keysWithPrefix("assets.$.sensors.current.") }

        return this.repo.update(query, update, "assets.$.sensors.current.");
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