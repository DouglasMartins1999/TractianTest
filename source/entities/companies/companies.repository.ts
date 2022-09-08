import startQueryOn from "../../settings/database.conf";
import * as mongodb from "mongodb";
import Company from "./companies.domain";

export class CompaniesRepository {
    insert(company: Company) {
        return startQueryOn("companies")
            .insertOne(company);
    }

    select(id?: string) {
        const query = startQueryOn("companies");
        const options = { projection: { assets: 0, members: 0 } }

        return id
            ? query.findOne({ _id: new mongodb.ObjectId(id) }, options)
            : query.find({}, options).toArray();
    }

    update(company: Company, id: string) {
        return startQueryOn("companies")
            .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: company });
    }

    delete(id: string){
        return startQueryOn("companies")
            .deleteOne({ _id: new mongodb.ObjectId(id )});
    }
}

export default new CompaniesRepository();