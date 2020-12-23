import * as customEnv from 'custom-env'
customEnv.env()

export const port = process.env.SERVER_PORT
export const baseUrl = process.env.BASE_URL