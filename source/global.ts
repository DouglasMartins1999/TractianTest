declare global {
    namespace NodeJS {
        interface Global {
            env: { [key: string]: any }
        }
    }
}

export default global;