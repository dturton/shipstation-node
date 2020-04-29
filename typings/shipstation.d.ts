export declare enum RequestMethod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE"
}
export interface IShipstationRequestOptions {
    url: string;
    method: RequestMethod;
    useBaseUrl?: boolean;
    data?: any;
}
export interface IShipstationAuthorization {
    apiKey: string;
    apiSecret: string;
}
export default class Shipstation {
    authorizationToken: string;
    private baseUrl;
    private apiKey;
    private apiSecret;
    constructor(auth: IShipstationAuthorization);
    request: ({ url, method, useBaseUrl, data, }: IShipstationRequestOptions) => Promise<import("axios").AxiosResponse<any>>;
}
