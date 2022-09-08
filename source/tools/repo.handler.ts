import { Document, Filter, FindOptions } from "mongodb";
import startQueryOn from "../settings/database.conf";

export default class ArrayRepository {
    constructor(public collection: string){}

    select(filter: Filter<Document>, options?: FindOptions<Document>) {
        return startQueryOn(this.collection)
            .find(filter, options)
            .toArray();
    }

    insert(filter: Filter<Document>, operation: Partial<Document>) {
        return startQueryOn(this.collection)
            .updateOne(filter, operation);
    }

    update(filter: Filter<Document>, operation: Partial<Document>, field: Document) {
        return startQueryOn(this.collection)
            .findOneAndUpdate(filter, operation, { projection: { field: 1 }});
    }

    delete(filter: Filter<Document>, operation: Partial<Document>) {
        return startQueryOn(this.collection)
            .updateOne(filter, operation);
    }
}