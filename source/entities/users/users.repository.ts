import instance from "../../settings/database.conf";
import User from "./users.domain";
import * as mongodb from "mongodb";
import { exceptions } from "../../settings/alerts.conf";

export class UserRepository {
    insert(user: User) {
        return instance
            .collection("users")
            .insertOne(user);
    }

    select(id?: string) {
        const query = instance
            .collection("users");

        return id
            ? query.findOne({ _id: new mongodb.ObjectId(id) })
            : query.find().toArray();
    }

    update(user: User, id: string) {
        if(!id) throw new Error(exceptions.id_not_informed);

        return instance
            .collection("users")
            .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: user });
    }

    delete(id: string){
        if(!id) throw new Error(exceptions.id_not_informed);

        return instance
            .collection("users")
            .deleteOne({ _id: new mongodb.ObjectId(id )});
    }
}

export default new UserRepository();