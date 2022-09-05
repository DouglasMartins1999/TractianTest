import * as chalk from "chalk";

import Module from "../interfaces/module.interface";

interface Logger {
    persist(info: Log)
}

interface LoggerConstructor {
    new (): Logger;
}

class Log {
    public date: Date;
    public desc: string;
    public method: string;
    public URL: string;
    public useragent: string;
    public status: number;
    public IP: string;
    public user: any;
    public error: any;

    constructor(ctx, error?) {
        this.date = new Date();
        this.desc = ctx.locals.spec?.description;
        this.method = ctx?.req?.method;
        this.URL = ctx?.req?.url;
        this.status = ctx?.statusCode;
        this.useragent = ctx?.req?.headers["user-agent"];
        this.IP = ctx?.req?.ip;
        this.user = ctx?.req?.user
        this.error = error;
    }
}

class ConsoleLogger implements Logger {
    statusParse(code: number): string {
        const ERROR = 400;
        const REDIRECT = 300;
        const SUCCESS = 200;

        if (code >= ERROR)
            return `Erro ao Processar (${code})`;

        if (code >= REDIRECT)
            return `Atendida com Ressalvas (${code})`;

        if (code >= SUCCESS)
            return `Atendida (${code})`;

        return "Não Avaliada";
    }

    persist(info: Log) {
        let payload = "";

        payload = `${payload}${chalk.hex("#D53C41")("►►►► ( ")}${chalk.bold(`${info.method} em ${info.URL}`)}${chalk.hex("#D53C41")(" ) ◄◄◄◄")}\n`;
        payload = info.desc ? `${payload}${chalk.hex("#CCC").bold(info.desc?.toUpperCase())}\n` : payload;
        payload = `${payload}• Data: ${new Intl.DateTimeFormat("pt-br", { timeStyle: "medium", dateStyle: "short" }).format(info.date)}\n`;
        payload = `${payload}• User-Agent: ${info.useragent ?? chalk.gray("Agente Não Identificado")}\n`;
        payload = `${payload}• IP: ${info.IP ?? chalk.gray("Não Rastreado")}\n`;
        payload = `${payload}• Usuário: ${info.user?.name ?? chalk.gray("Não Autenticado")}\n`;
        payload = `${payload}• Status: ${this.statusParse(info.status)}\n`;

        console.info(payload);
    }
}

export default class LogModule implements Module {
    static ViaConsole = ConsoleLogger;

    public instances: Logger[];

    constructor(...loggers: LoggerConstructor[]){
        this.instances = loggers.map(l => new l());
    }

    addLogger(instance) {
        this.instances.push(instance);
        return this;
    }

    log(req, err?) {
        const info = new Log(req, err);
        const ops = this.instances.map(i => Promise.resolve(i.persist(info)));
        return Promise.allSettled(ops)
    }

    handleRequest = (route: any) => {
        if (route?.ignoreLogger)
            return async(r, _, next) => next()

        return async(_, res, next) => {
            await this.log(res);
            return next();
        }
    }

    handleError = async (err, _, res, next) => {
        await this.log(res, err);
        return next(err);
    }
}