import { Request } from "express";
import Reply from "../../tools/reply.handler";
import Service from "../../tools/service.handler";

import sensorsRepository from "./sensors.repository";
import Sensor from "./sensors.domain";

class SensorService extends Service {
    async fetch(ctx: Request) {
        const { company, asset } = ctx.params;
        const action = await sensorsRepository.select(company, asset);

        return new Reply(Reply.codes.OK, action).setListBehavior(!!asset, true);
    }

    async create(ctx: Request) {
        const { company, asset } = ctx.params;
        const sensor = new Sensor(ctx.body).validate(Sensor.creationSchema);
        const action = await sensorsRepository.insert(company, asset, sensor);

        const body = { id: sensor["_id"] };
        const status = action.modifiedCount 
            ? Reply.codes.CREATED 
            : Reply.codes.BADREQUEST;
        
        return new Reply(status, body);  
    }

    async update(ctx: Request) {
        const { company, asset } = ctx.params;
        const sensor = new Sensor(ctx.body).validate();
        const action = await sensorsRepository.update(company, asset, sensor);

        const body = action?.value?.members?.[0];
        const status = body
            ? Reply.codes.ACCEPTED 
            : Reply.codes.NOTFOUND;
        
        return new Reply(status, body);
    }

    async remove(ctx: Request) {
        const { company, asset } = ctx.params;
        const action = await sensorsRepository.delete(company, asset);

        const body = { deletedAmount: action?.upsertedCount };
        const status = Reply.codes.NOCONTENT;

        return new Reply(status, body);
    }
}

export default new SensorService();

