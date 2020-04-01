import { TSugConfig, TData, TSubject } from "./interface";
import SuggesterSubject from "./suggester.subject";
import ListObserver from "./lisiting.observer";
import DisplayObserver from "./display.observer";

const Suggester = (options: TSugConfig, data: TData[]): TSubject => {
    const SelectBox = new SuggesterSubject(options);
    new ListObserver(SelectBox);
    new DisplayObserver(SelectBox);
    SelectBox.setData({
        hasSelectionUpdated: false,
        hasListUpdated: false,
        construct: true,
        selection: [],
        list: data,
        query: "",
        selectionAr: []
    });
    return SelectBox;
};

export default Suggester;
