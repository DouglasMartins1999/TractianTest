import * as Joi from "joi";
import Model from "../../tools/model.handler";

export default class User extends Model {
    static reqs = {
        MIN_NAME_LENGTH: 5
    }

    static defaultSchema = Joi.object({
        name: Joi.string().min(User.reqs.MIN_NAME_LENGTH).label("Nome do Usuário"),
        role: Joi.string().valid("Operador", "Coordenador", "Gerente").label("Cargo do Usuário"),
        companyRef: Joi.string().hex().label("Companhia Atual"),
        createdAt: Joi.date().iso().default("now").label("Data de Criação"),
        updatedAt: Joi.date().iso().default("now").label("Data de Atualização")
    })

    static creationSchema = User.defaultSchema.concat(Joi.object({
        name: Joi.required(),
        company: Joi.required()
    }))
}