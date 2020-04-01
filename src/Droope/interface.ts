interface TData {
    id: string;
    name: string;
}
interface TSubject {
    config: TDroopeConfig;
    arrowCounter: number;
    state: TState;
    noResultElement: HTMLElement;
    registerObserver(o: TObserver): void;
    unregisterObserver(o: TObserver): void;
    notifyObservers(): void;
    setData(data: TState): void;
    removeSelection(id: string): void;
}

interface TState {
    list: TData[];
    selection: TData[];
    hasListUpdated: boolean;
    hasSelectionUpdated: boolean;
}

interface TObserver {
    update(arrayOfObjects: TState): void;
}
interface TDroopeConfig {
    readonly domId: string;
    readonly inputElement: HTMLInputElement | null;
    readonly lisitingElement: HTMLElement | null;
    readonly displayElement: HTMLElement | null;
    readonly selectLimit?: number;
    readonly displayListOnFocus?: boolean;
    readonly displayDecorationList?: string[];
    readonly noResultErrorMessage?: string;
    readonly tagSelectedValues: boolean;
    readonly listLimit?: number;
    readonly checkboxes?: boolean;
}

export {
    TData,
    TSubject,
    TState,
    TObserver,
    TDroopeConfig
};
