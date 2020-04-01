interface TData {
    id?: number;
    name?: string;
    displayTextEn: string;
    textsuggest?: string;
}

interface TSubject {
    state: TState;
    debounceTimer: NodeJS.Timeout | null;
    config: TSugConfig;
    dataSet: TData[];
    noResultElement: HTMLElement;
    headingElement: HTMLElement;
    listObserverCollection: TObserver[];
    registerObserver(o: TObserver): void;
    unregisterObserver(o: TObserver): void;
    notifyObservers(): void;
    removeSelection(displayTextEn: string): void;
    setData(data: TState): void;
}

interface TVersionResponse extends TResponse {
    "suggester_v": string;
    "prefetch_v": string;
    "autocorrect_v": string;
    "relatedconcepts_v": string;
}

interface TState {
    list: TData[];
    selection: string[];
    selectionAr: string[];
    hasListUpdated: boolean;
    hasSelectionUpdated: boolean;
    construct?: boolean;
    query: string;
    hasQueryUpdated?: boolean;
}

interface TObserver {
    update(arrayOfObjects: TState): void;
}
interface TPayload {

    [key: string]: any;
    query: string;
    category: string;
    vertical?: string;
    source?: string;
    appId?: string | number;
    edge?: number;
    locale?: string;
    additionalfields?: string;
    limit?: number;
}

interface TSugOptions {
    inputElement: HTMLInputElement;
    listingElement: HTMLElement;
    displayElement: HTMLElement;
    selectLimit?: number;
    displayListOnFocus?: boolean;
    displayDecorationList?: string[];
    selectedDecorator: string;
    noResultErrorMessage?: string;
    displayListStyle?: string;
    sanitiseString?: boolean;
    specialCharactersAllowedList: string[];
    isPrefetch?: boolean;
}

interface TSugConfig {
    urls?: { [keys: string]: string };
    readonly source?: string | undefined;
    readonly category?: string | undefined;
    readonly maxSuggestions?: number | undefined;
    readonly specialCharactersAllowedList: string[] | RegExp;
    readonly edge?: number | undefined;
    readonly invoker?: string | undefined;
    readonly version?: string | undefined;
    readonly storageKey?: { [keys: string]: string };
    readonly keywords?: string;
    readonly appId?: number | undefined;
    readonly domId: string;
    readonly inputElement: HTMLInputElement | null;
    readonly listingElement: HTMLElement | null;
    readonly displayElement: HTMLElement | null;
    readonly selectLimit?: number;
    readonly displayListOnFocus?: boolean;
    readonly displayDecorationList?: string[];
    readonly noResultErrorMessage?: string;
    readonly displayBehaviour?: string;
    readonly listLimit?: number;
    readonly startSearchAfter?: number;
    readonly checkboxes?: boolean;
    readonly sanitiseString?: boolean;
    // eslint-disable-next-line @typescript-eslint/camelcase
    readonly relatedConcept_dataLayer?: boolean;
    readonly isPrefetch?: boolean;
    readonly isRelatedConceptsSupported?: boolean;
    readonly suggesterHeadingElementText?: string | null;
    readonly relatedConceptText?: string | null;
    readonly debounceTimeout?: number;
    readonly placeholder?: boolean;
    readonly trackUserInteraction?: boolean; // to track user Interaction
    vertical?: string;
    relatedConceptCategory?: string;
    readonly grouping?: boolean;
    readonly relatedConceptsLimit?: number;
    readonly defaultPrefetchLookup?: boolean;
}
interface TSuggesterResponse extends TResponse {
    resultList: any;
}

interface TRecentSearchResponse extends TResponse {
    resultConcepts: any;
}

interface TResponse {
    [key: string]: any;
    "suggester_v": string;
    "prefetch_v": string;
    "autocorrect_v": string;
    "relatedconcepts_v": string;
    resultConcepts: any;
    resultList: any;
}

type TObject = Record<string, string>;
type TLanguage = "EN" | "AR" | "SC";

export {
    TData,
    TSubject,
    TState,
    TObserver,
    TResponse,
    TSuggesterResponse,
    TPayload,
    TRecentSearchResponse,
    TSugOptions,
    TVersionResponse,
    TObject,
    TSugConfig,
    TLanguage
};
