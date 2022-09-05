export default class Service {
    constructor() {
        Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter(method => (method !== 'constructor'))
            .forEach((method) => { this[method] = this[method].bind(this); });
    }
}