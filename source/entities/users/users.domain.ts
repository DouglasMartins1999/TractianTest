import * as Joi from "joi";
import Model from "../../tools/model.handler";

export default class User extends Model {
    static schema = Joi.object({
        name: Joi.string(),
        isAdmin: Joi.boolean()
    })
}