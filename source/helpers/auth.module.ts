import { Handler } from "express";
import Module from "../interfaces/module.interface";
import Route from "../interfaces/route.interface";

import * as passport from "passport";
import * as JWTCStrategy from "passport-jwt-cookiecombo";

export default class AuthModule implements Module {
    public middlewares: { [key: string]: Handler }
    public handler: Handler
    public passport: passport.Authenticator
    public strategy: passport.Strategy

    constructor() {
        const options = { secretOrPublicKey: global.env.TOKEN_SECRET };

        this.passport = passport;
        this.strategy = new JWTCStrategy(options, (payload, done) => done(null, payload.user))
        this.handler = this.passport.authenticate(this.strategy.name!, { failWithError: true });
        this.passport.use(this.strategy);

        this.middlewares = {
            noAuth: (req, res, next) => next(),
            withAuth: (req, res, next) => this.handler(req, res, next)
        };
    }

    handleRequest(route: Route): Handler {
        return route.authNeeded
            ? this.middlewares.withAuth
            : this.middlewares.noAuth;
    }
}