import * as Joi from "joi";
import { ObjectId } from "mongodb";
import Model from "../../tools/model.handler";

export default class Asset extends Model {
    static reqs = {
        MAX_HEALTH_LEVEL: 100
    }

    static defaultSchema = Joi.object({
        name: Joi.string().label("Nome da Máquina"),
        description: Joi.string().label("Descrição da Máquina"),
        model: Joi.string().label("Modelo"),
        status: Joi.string().valid("Running", "Alerting", "Stopped").label("Status"),
        location: Joi.string().label("Localização"),
        healthLevel: Joi.number().positive().max(Asset.reqs.MAX_HEALTH_LEVEL).label("Nível de Integridade"),
        createdAt: Joi.date().iso().default(() => new Date()).label("Data de Cadastro"),
        updatedAt: Joi.date().iso().default(() => new Date()).label("Data de Atualização")
    })

    static creationSchema = Asset.defaultSchema.concat(Joi.object({
        _id: Joi.forbidden().default(() => new ObjectId()),
        name: Joi.required(),
        description: Joi.required(),
        model: Joi.required(),
        location: Joi.required(),
        status: Joi.string().default("Running"),
        healthLevel: Joi.number().default(Asset.reqs.MAX_HEALTH_LEVEL),
        sensors: Joi.object().forbidden().default({ current: null, previous: [] })
    }))
}