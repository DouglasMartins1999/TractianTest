import * as Joi from "joi";
import * as crypto from "crypto";
import Model from "../../tools/model.handler";

export default class Asset extends Model {
    static defaultSchema = Joi.object({
        code: Joi.string().uuid().label("Código do Sensor"),
        type: Joi.string().label("Tipo de Sensor"),
        assetRef: Joi.string().hex().label("Pertence à (Companhia)"),
        productedAt: Joi.date().iso().label("Data de Produção"),
        createdAt: Joi.date().iso().default("now").label("Data de Cadastro"),
        updatedAt: Joi.date().iso().default("now").label("Data de Atualização")
    })

    static creationSchema = Asset.defaultSchema.concat(Joi.object({
        code: Joi.string().default(crypto.randomUUID()),
        type: Joi.required(),
        assetRef: Joi.required(),
        productedAt: Joi.required(),
    }))
}