import { ISubscribeToWebhookOpts, ISubscriptionResponse, IWebhook, IWebhookPaginationResult, IOrderPaginationResult } from '../models';
import Shipstation from '../shipstation';
import { BaseResource } from './Base';
export declare class Webhooks extends BaseResource<IWebhook> {
    protected shipstation: Shipstation;
    constructor(shipstation: Shipstation);
    getAll(): Promise<IWebhookPaginationResult>;
    subscribe(data: ISubscribeToWebhookOpts): Promise<ISubscriptionResponse>;
    unsubscribe(id: number): Promise<null>;
    private getPagedPayloadByUrl;
    getPayloadByUrl(url: string): Promise<IOrderPaginationResult>;
}
