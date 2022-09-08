import * as Joi from "joi";
import * as crypto from "crypto";
import Model from "../../tools/model.handler";

export default class Sensor extends Model {
    static defaultSchema = Joi.object({
        code: Joi.string().uuid().label("Código do Sensor"),
        type: Joi.string().label("Tipo de Sensor"),
        productedAt: Joi.date().iso().label("Data de Produção"),
        createdAt: Joi.date().forbidden().label("Data de Cadastro"),
        updatedAt: Joi.date().forbidden().default(new Date()).label("Data de Atualização")
    })

    static creationSchema = Sensor.defaultSchema.concat(Joi.object({
        code: Joi.string().default(crypto.randomUUID()),
        type: Joi.required(),
        productedAt: Joi.required(),
        createdAt: Joi.date().default(new Date())
    }));
}