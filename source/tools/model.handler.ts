import * as Joi from "joi";
import * as mongodb from "mongodb";
import { validations } from "../settings/alerts.conf";

export default class Model {
    static defaultSchema: Joi.Schema;

    constructor(content = {}) {
        Object.assign(this, content);
    }

    validate(schema: Joi.Schema = (this.constructor as typeof Model).defaultSchema): this {
		const model = schema.validate(this, { messages: validations });
        if (model.error) throw model.error;
		return model.value;
	}

    keysWithPrefix(prefix: string): { [key: string]: any } {
        const newObj = {};
        const keys = Object.keys(JSON.parse(JSON.stringify(this)));

        keys.forEach(k => newObj[prefix + k] = this[k])
        return newObj;
    }
}