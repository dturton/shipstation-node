import axios, { AxiosRequestConfig } from 'axios'

// tslint:disable-next-line:no-var-requires
const base64 = require('base-64')
// tslint:disable-next-line:no-var-requires
const stopcock = require('stopcock')

const rateLimitOpts = {
  limit: 40,
  interval: 1000 * 40,
}

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

export interface IShipstationRequestOptions {
  url: string
  method: RequestMethod
  useBaseUrl?: boolean
  data?: any
}

export interface IShipstationAuthorization {
  apiKey: string
  apiSecret: string
}

export default class Shipstation {
  public authorizationToken: string
  private baseUrl: string = 'https://ssapi.shipstation.com/'
  private apiKey: string
  private apiSecret: string

  constructor(auth: IShipstationAuthorization) {
    this.apiKey = process.env.SS_API_KEY ? process.env.SS_API_KEY : auth.apiKey
    this.apiSecret = process.env.SS_API_SECRET
      ? process.env.SS_API_SECRET
      : auth.apiSecret

    if (!this.apiKey || !this.apiSecret) {
      // tslint:disable-next-line:no-console
      throw new Error(
        `APIKey and API Secret are required! Provided API Key: ${this.apiKey} API Secret: ${this.apiSecret}`
      )
    }

    this.authorizationToken = base64.encode(`${this.apiKey}:${this.apiSecret}`)

    // Globally define API ratelimiting
    this.request = stopcock(this.request, rateLimitOpts)
  }

  public request = ({
    url,
    method,
    useBaseUrl = true,
    data,
  }: IShipstationRequestOptions) => {
    const opts: AxiosRequestConfig = {
      headers: {
        Authorization: `Basic ${this.authorizationToken}`,
      },
      method,
      url: `${useBaseUrl ? this.baseUrl : ''}${url}`,
    }

    if (data) {
      opts.data = data
    }

    return axios.request(opts)
  }
}
