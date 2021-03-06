import { IShipment } from '../models'
import Shipstation, { RequestMethod } from '../shipstation'
import { BaseResource } from './Base'

export class Shipments extends BaseResource<IShipment> {
  constructor(protected shipstation: Shipstation) {
    super(shipstation, 'shipments')
  }

  public async getAll(opts?: object): Promise<IShipment[]> {
    const query = this.buildQueryStringFromParams(opts)
    const url = this.baseUrl + query

    const response = await this.shipstation.request({
      url,
      method: RequestMethod.GET
    })
    return response.data as IShipment[]
  }
}
