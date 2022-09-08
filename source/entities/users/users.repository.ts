import { ObjectId } from "mongodb";
import ArrayRepository from "../../tools/repo.handler";
import User from "./users.domain";

export class UserRepository {
    public repo: ArrayRepository;

    constructor(collection: string){
        this.repo = new ArrayRepository(collection);
    }

    insert(company: string, user: User) {
        const query = { _id: new ObjectId(company) };
        const update = { $push: { members: user } };

        return this.repo.insert(query, update);
    }

    select(company: string, id?: string) {
        const query: any = { _id: new ObjectId(company) };
        const options: any = { projection: {} }
        
        if(id) {
            query.members = { $elemMatch: { _id: new ObjectId(id) } }
            options.projection["members.$"] = 1
        } else {
            options.projection["members"] = 1
        }

        return this.repo.select(query, options);
    }

    update(company: string, user: User, id: string) {
        const query = { _id: new ObjectId(company), members: { $elemMatch: { _id: new ObjectId(id) } } };
        const update = { $set: user.keysWithPrefix("members.$.") }

        return this.repo.update(query, update, "members.$");
    }

    delete(company: string, id: string){
        const query = { _id: new ObjectId(company) };
        const update = { $pull: { members: { _id: new ObjectId(id) } } }

        return this.repo.delete(query, update);
    }
}

export default new UserRepository("companies");