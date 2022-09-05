import * as Joi from "joi";
import Model from "../../tools/model.handler";

export default class Asset extends Model {
    static reqs = {
        MAX_HEALTH_LEVEL: 100
    }

    static defaultSchema = Joi.object({
        name: Joi.string().label("Nome da Máquina"),
        description: Joi.string().label("Descrição da Máquina"),
        model: Joi.string().label("Modelo"),
        ownerRef: Joi.string().hex().label("Pertence à (Companhia)"),
        status: Joi.string().valid("Running", "Alerting", "Stopped").label("Status"),
        location: Joi.string().label("Localização"),
        healthLevel: Joi.number().positive().max(Asset.reqs.MAX_HEALTH_LEVEL).label("Nível de Integridade"),
        createdAt: Joi.date().iso().default("now").label("Data de Cadastro"),
        updatedAt: Joi.date().iso().default("now").label("Data de Atualização")
    })

    static creationSchema = Asset.defaultSchema.concat(Joi.object({
        name: Joi.required(),
        description: Joi.required(),
        model: Joi.required(),
        owner: Joi.required(),
        status: Joi.string().default("Running"),
        healthLevel: Joi.required().default(Asset.reqs.MAX_HEALTH_LEVEL),
        location: Joi.required()
    }))
}