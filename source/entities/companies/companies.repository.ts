import startQueryOn from "../../settings/database.conf";
import * as mongodb from "mongodb";
import { exceptions } from "../../settings/alerts.conf";
import Company from "./companies.domain";

export class CompaniesRepository {
    insert(company: Company) {
        return startQueryOn("companies")
            .insertOne(company);
    }

    select(id?: string) {
        const query = startQueryOn("companies");

        return id
            ? query.findOne({ _id: new mongodb.ObjectId(id) })
            : query.find().toArray();
    }

    update(company: Company, id: string) {
        if(!id) throw new Error(exceptions.id_not_informed);

        return startQueryOn("companies")
            .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: company });
    }

    delete(id: string){
        if(!id) throw new Error(exceptions.id_not_informed);

        return startQueryOn("companies")
            .deleteOne({ _id: new mongodb.ObjectId(id )});
    }
}

export default new CompaniesRepository();