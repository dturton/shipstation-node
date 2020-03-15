import {
  ISubscribeToWebhookOpts,
  ISubscriptionResponse,
  IWebhook,
  IWebhookPaginationResult,
  IOrderPaginationResult
} from '../models'
import Shipstation, { RequestMethod } from '../shipstation'
import { BaseResource } from './Base'

export class Webhooks extends BaseResource<IWebhook> {
  constructor(protected shipstation: Shipstation) {
    super(shipstation, 'webhooks')
  }

  public async getAll(): Promise<IWebhookPaginationResult> {
    const url = this.baseUrl
    const response = await this.shipstation.request({
      url,
      method: RequestMethod.GET
    })
    return response.data as IWebhookPaginationResult
  }

  public async subscribe(
    data: ISubscribeToWebhookOpts
  ): Promise<ISubscriptionResponse> {
    const url = `${this.baseUrl}/subscribe`
    const response = await this.shipstation.request({
      url,
      method: RequestMethod.POST,
      data
    })
    return response.data as ISubscriptionResponse
  }

  public async unsubscribe(id: number): Promise<null> {
    const url = `${this.baseUrl}/${id}`
    await this.shipstation.request({
      url,
      method: RequestMethod.DELETE
    })

    return null
  }

  private async getPagedPayloadByUrl(
    url: string,
    page: number = 1
  ): Promise<IOrderPaginationResult> {
    const response = await this.shipstation.request({
      url: `${url}&page=${page}`,
      method: RequestMethod.GET,
      useBaseUrl: false //use custom url
    })
    return response.data as IOrderPaginationResult
  }

  public async getPayloadByUrl(url: string): Promise<IOrderPaginationResult> {
    let r = 1
    let firstRequest: IOrderPaginationResult = await this.getPagedPayloadByUrl(
      url,
      r
    )

    while (r < firstRequest.pages) {
      r++
      let newRequest: IOrderPaginationResult = await this.getPagedPayloadByUrl(
        url,
        r
      )

      firstRequest.orders = firstRequest.orders.concat(newRequest.orders)
    }
    return firstRequest as IOrderPaginationResult
  }
}
