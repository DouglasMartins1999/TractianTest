import * as Joi from "joi";
import { ObjectId } from "mongodb";
import Model from "../../tools/model.handler";

export default class User extends Model {
    static reqs = {
        MIN_NAME_LENGTH: 5
    }

    static defaultSchema = Joi.object({
        name: Joi.string().min(User.reqs.MIN_NAME_LENGTH).label("Nome do Usuário"),
        role: Joi.string().valid("Operador", "Coordenador", "Gerente").label("Cargo do Usuário"),
        createdAt: Joi.date().iso().default(new Date()).label("Data de Criação"),
        updatedAt: Joi.date().iso().default(new Date()).label("Data de Atualização")
    })

    static creationSchema = User.defaultSchema.concat(Joi.object({
        _id: Joi.forbidden().default(new ObjectId()),
        name: Joi.required()
    }));
}