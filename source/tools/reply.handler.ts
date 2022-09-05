import { exceptions } from "../settings/alerts.conf";

export default class Reply {
	code: number;
	payload: any;
	headers?: { [key: string]: string };
	error?: { [key: string]: string };

    constructor(code: number, payload: any, headers?: { [key: string]: string }) {
		this.code = code;
		this.payload = payload;
        this.headers = headers;
	}

	setHeader(key: string, value: string) {
		this.headers = this.headers ?? {};
		this.headers[key] = value;
		return this;
	}

	setError(info: { [key: string]: string }) {
		this.error = info;
		return this;
	}

	setListBehavior(onlyFirstItem: boolean = false, throwWhenEmpty: boolean = global.env.THROW_ON_EMPTY_LIST) {
		if(throwWhenEmpty && !this.payload.length) {
			this.setError({ info: "Não foram encontrados registros nessa consulta" });
			this.code = Reply.codes.NOTFOUND;
			return this;
		}

		if (onlyFirstItem && this.payload.length === 1) {
			this.payload = this.payload[0];
		}

		return this;
	}

    static codes = {
		CONTINUE: 100,
		SWITCHINGPROTOCOLS: 101,
		PROCESSING: 102,

		OK: 200,
		CREATED: 201,
		ACCEPTED: 202,
		NAI: 203,
		NOCONTENT: 204,
		RESETCONTENT: 205,
		PARTIALCONTENT: 206,
		MULTISTATUS: 207,
		ALREADYREPORTED: 208,
		IMUSED: 226,

		MULTICHOICES: 300,
		MOVED: 301,
		FOUND: 302,
		SEEOTHER: 303,
		NOTMODIFIED: 304,
		USEPROXY: 305,
		TEMPREDIRECT: 307,
		PERMREDIRECT: 308,

		BADREQUEST: 400,
		UNAUTHORIZED: 401,
		PAYMENTREQ: 402,
		FORBIDDEN: 403,
		NOTFOUND: 404,
		METHODNOTALLOWED: 405,
		NOTACCEPTABLE: 406,
		PROXYAUTHREQ: 407,
		TIMEOUT: 408,
		CONFLICT: 409,
		GONE: 410,
		LENGTHREQ: 411,
		PRECONDFAIL: 412,
		LARGEPAYLOAD: 413,
		LONGREQURI: 414,
		UNSUPPORTEDMEDIA: 415,
		REQRANGENOTSATISFIABLE: 416,
		EXPECTFAILED: 417,
		TEAPOT: 418,
		MISDIRECTREQ: 421,
		UNPROCENTITY: 422,
		LOCKED: 423,
		FAILDEPENDENCY: 424,
		UPGRADEREQ: 426,
		PRECONDREQ: 428,
		TOOMANYREQ: 429,
		LARGEHEADER: 431,
		CONNCLOSED: 444,
		LEGALUNAVAILABLE: 451,
		CLIENTCLOSEDREQ: 499,

		SERVERERROR: 500,
		NOTIMPLEMENTED: 501,
		BADGATEWAY: 502,
		SERVUNAVAILABLE: 503,
		GATEWAYTIMEOUT: 504,
		NOTSUPPORTVERS: 505,
		VARIANTNEGOT: 506,
		INSUFFSTORAGE: 507,
		LOOP: 508,
		NOTEXTENDED: 510,
		NETAUTHREQ: 511,
		NETCONNTIMEOUT: 599
	};
}