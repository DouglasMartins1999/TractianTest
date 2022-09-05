import * as parser from "auto-parse";
import * as process from "process";
import * as dotenv from "dotenv";
import * as fs from "fs";

export class Utils {
    constructor() {
        dotenv.config({ debug: true, path: process.env.PWD + "/.env" })

        if (!process.env.IGNORE_GLOBAL_PARSED_ENV) {
            global.env = {}
    
            for(const e in process.env){
                global.env[e] = parser(process.env[e]);
            }
        }
    }

    fileFinder(path: string, pattern: RegExp, findedArray: string[] = []) {
        const files = fs.readdirSync(path, { withFileTypes: true });
    
        for(let f of files) {
            if(f.isDirectory()) {
                this.fileFinder(path + "/" + f.name, pattern, findedArray);
                continue;
            }
    
            if(f.name.match(pattern)){
                findedArray.push(path + "/" + f.name);
            }
        }
    
        return findedArray;
    }
}

export default new Utils();