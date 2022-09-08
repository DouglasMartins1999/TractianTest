import * as Joi from "joi";
import Model from "../../tools/model.handler";

export default class Company extends Model {
    static defaultSchema = Joi.object({
        name: Joi.string().label("Nome Fantasia"),
        location: Joi.string().hex().label("Localização"),
        sector: Joi.string().label("Setor de Atuação"),
        createdAt: Joi.date().iso().default(() => new Date()).label("Data de Criação"),
        updatedAt: Joi.date().iso().default(() => new Date()).label("Data de Atualização")
    })

    static creationSchema = Company.defaultSchema.concat(Joi.object({
        name: Joi.required(),
        members: Joi.array().forbidden().default([]),
        assets: Joi.array().forbidden().default([])
    }))
}