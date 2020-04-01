/* eslint-disable @typescript-eslint/camelcase */
import { TPayload, TResponse, TSugConfig } from "./interface";
import { CacheFactory, TLocalStorageCacheStorage } from "../Storage/CacheFactory";

export default class Model {
    private appId: number = 0;
    private maxSuggestions: number = 0;
    private prefetch: string = "";
    private static sugCache: TLocalStorageCacheStorage | null = CacheFactory.getCache("sgtr");

    constructor(config: TSugConfig) {
        try {
            if (config.appId && config.maxSuggestions && config.urls && config.urls.prefetch) {
                this.appId = config.appId;
                this.maxSuggestions = config.maxSuggestions;
                this.prefetch = config.urls.prefetch;
            } else {
                throw new Error("Config Params were not provided quite well");
            }
        } catch (e) {
            console.warn("Please provide proper config to help in setting the model params: " + e);
        }
    }

    /**
     * This method is responsible for sending an ajax request to fetch the suggestions for the typed query
     * @param url : url for ajax hit
     * @param payload : Contains an Object for paramets to be passed in the url
     */
    public sendXhr = (url: string, payload: TPayload | null, prefetchKey: string): Promise<TResponse> => {
        return new Promise((resolve: Function, reject: Function) => {
            const xhr: XMLHttpRequest = new XMLHttpRequest();
            try {
                if (!url) {
                    throw Error("Received empty payload/url to send request");
                }
                if (payload && !payload.query) {
                    throw Error("Received empty query");
                }

                const finalPayload: TPayload = {
                    query: payload && payload.query ? payload.query : "",
                    category: payload && payload.category ? payload.category : "",
                    ...payload,
                    appId: this.appId,
                    limit: this.maxSuggestions
                };
                const params = Object.keys(finalPayload).map(
                    (key) => key + "=" + finalPayload[key]).join("&");

                const obj = prefetchKey ? Model.getFromStorage(prefetchKey) : null;
                if (obj && obj[finalPayload.query]) {
                    const response: TResponse = {
                        resultList: obj[finalPayload.query],
                        suggester_v: "",
                        prefetch_v: "",
                        autocorrect_v: "",
                        relatedconcepts_v: "",
                        resultConcepts: []
                    };
                    resolve(response);
                } else {
                    xhr.open("GET", url + params, true);

                    xhr.onload = (): void => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            console.log(JSON.parse(xhr.response));
                            xhr.response && resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.statusText);
                        }
                    };
                    xhr.onerror = (): void => reject(xhr.statusText);
                    xhr.send();
                }
                return xhr;
            } catch (data) {
                console.error(data);
                return xhr;
            }
        });
    }

    public prefetchData = (): void => {
        const url = this.prefetch + Math.random();
        this.sendXhr(url, null, "").then(function () {
            // set response in LS
        });
    }

    public static setInStorage(key: string, value: Record<string, any>): void {
        this.sugCache && this.sugCache.setItem(key, value, null);
    }

    public static getFromStorage(key: string): Record<string, any> | null {
        console.log("suggester cache", this.sugCache);
        console.log("suggester cache key", this.sugCache ? this.sugCache.getItem(key) : "");
        return this.sugCache && this.sugCache.getItem(key);
    }
}
