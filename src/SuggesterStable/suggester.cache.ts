
import { TResponse, TSugConfig, TVersionResponse, TObject } from "./interface";
import Model from "./suggester.model";

class CacheHandler {
    public modelInstance: Model;
    public config: TSugConfig;
    constructor(config: TSugConfig) {
        this.config = config;
        this.modelInstance = new Model(config);
        this.initiatePrefetchingSuggesterSuggestions(config);
    }

    public initiatePrefetchingSuggesterSuggestions(params: TSugConfig): void {
        try {
            const { config } = this;
            if (config.isPrefetch && config.urls && config.storageKey) {
                const url = config.urls.prefetch + Math.random();
                this.fetchVersion().then((response: TVersionResponse): void => {
                    Model.setInStorage(config.storageKey && config.storageKey.versionKey ? config.storageKey.versionKey : "", response);

                    const prefetchedData = Model.getFromStorage(config.storageKey && config.storageKey.prefetchKey ? config.storageKey.prefetchKey : "");
                    // todo:logic for when to fetch next
                    if (prefetchedData) {
                        /**
                     *
                     * @param  {String} prefetchedData.keyword_based_data [need to check with blank string,
                     * because in some cases false is treated as a true]
                     */
                        if ((params.keywords && prefetchedData.keyword_based_data === false) || (+new Date(prefetchedData.ttl)) - (+new Date()) < 0) {
                            this.fetchKeywordBasedData(prefetchedData);
                        }
                    } else {
                        this.modelInstance.sendXhr(url + "?segments=''", null, "").then(function (resp) {
                            if (config.storageKey) {
                                Model.setInStorage(config.storageKey.prefetchKey, resp);
                            }
                        });
                    }
                });
            } else {
                throw new Error("Prefetching not enabled in the config");
            }
        } catch (e) {
            console.warn(e.message);
        }
    }

    /**
     * To check the version of suggester apis to be used.
     * Must be called only once on page load even if page has multiple suggesters.
     * Sets the version number received in the storage.
     * This version no must be passed in later api calls to fetch suggestions.
     * @returns {void}
     * @access : private
     */
    private fetchVersion = (): Promise<TResponse> => {
        const { config } = this;
        const url = config.urls ? config.urls.checkVersion + Math.random() + "&" : "";
        return this.modelInstance.sendXhr(url, null, "");
    };

    /**
     *
     */
    private fetchKeywordBasedData = (prefetchedData: TObject): void => {
        try {
            const { config } = this;
            if (config.urls && config.storageKey && config.storageKey.prefetchKey) {
                this.modelInstance.sendXhr(config.urls.prefetch + "segments=" + prefetchedData.segments, null, "").then((rData) => {
                    Model.setInStorage(config.storageKey && config.storageKey.prefetchKey ? config.storageKey.prefetchKey : "", this.mergeData(prefetchedData, rData));
                });
            }
        } catch (e) {
            console.warn(e.message);
        }
    }

    private mergeData = (prefetchedData: any, newData: any): TObject => {
        const { config } = this;
        config.vertical = newData.vertical;
        let ac, rc;

        if (config.vertical) {
            const newAC: any = newData.ac;
            const newRC: any = newData.rc;

            const category = config.category;
            const rcCategory = config.relatedConceptCategory;
            for (const key in newAC) {
                for (const k in newAC[key]) {
                    if (category && category[(k as any)]) {
                        const premKey = k + "_" + config.vertical;
                        newAC[key][premKey] = newAC[key][k];
                        delete newAC[key][k];
                    } else {
                        delete newAC[key][k];
                    }
                }
            }
            for (const key in newRC) {
                for (const k in newRC[key]) {
                    if (rcCategory && rcCategory[(k as any)]) {
                        const premKey = k + "_" + config.vertical;
                        newRC[key][premKey] = newRC[key][k];
                        delete newRC[key][k];
                    } else {
                        delete newRC[key][k];
                    }
                }
            }
            ac = { ...prefetchedData.ac, ...newAC };
            rc = { ...prefetchedData.rc, ...newRC };
        } else {
            ac = { ...prefetchedData.ac, ...newData.ac };
            rc = { ...prefetchedData.rc, ...newData.rc };
        }

        return {
            ac: ac,
            rc: rc,
            ttl: newData.ttl,
            segments: newData.segments,
            // eslint-disable-next-line @typescript-eslint/camelcase
            keyword_based_data: newData.keyword_based_data
        };
    }
}

export default CacheHandler;
