import { Request } from "express";
import Reply from "../../tools/reply.handler";
import Service from "../../tools/service.handler";

import sensorsRepository from "./sensors.repository";
import Sensor from "./sensors.domain";

class SensorService extends Service {
    async fetch(ctx: Request) {
        const { company, asset } = ctx.params;
        const action = await sensorsRepository.select(company, asset);
        
        const body = action[0]?.["assets"]?.[0]?.["sensors"];
        const status = body
            ? Reply.codes.OK 
            : Reply.codes.NOTFOUND;

        return new Reply(status, body);
    }

    async create(ctx: Request) {
        const { company, asset } = ctx.params;
        const sensor = new Sensor(ctx.body).validate(Sensor.creationSchema);
        const action = await sensorsRepository.insert(company, asset, sensor);

        const body = { code: sensor["code"] };
        const status = action.result.nModified 
            ? Reply.codes.CREATED 
            : Reply.codes.BADREQUEST;
        
        return new Reply(status, body);  
    }

    async update(ctx: Request) {
        const { company, asset } = ctx.params;
        const sensor = new Sensor(ctx.body).validate();
        const action = await sensorsRepository.update(company, asset, sensor);

        const changed = action?.lastErrorObject?.n;
        const status = changed
            ? Reply.codes.ACCEPTED 
            : Reply.codes.NOTFOUND;
        
        return new Reply(status, { changed });
    }

    async remove(ctx: Request) {
        const { company, asset } = ctx.params;
        const action = await sensorsRepository.delete(company, asset);

        const status = action.result.nModified 
            ? Reply.codes.NOCONTENT 
            : Reply.codes.NOTFOUND;

        return new Reply(status, {});
    }
}

export default new SensorService();

