import * as Joi from "joi";
import { validations } from "../settings/alerts.conf";

export default class Model {
    static schema: Joi.Schema;

    constructor(content = {}) {
        Object.assign(this, content);
    }

    validate(schema: Joi.Schema = (this.constructor as typeof Model).schema) {
		const model = schema.validate(this, { messages: validations });
        if (model.error) throw model.error;
		return model.value;
	}
}