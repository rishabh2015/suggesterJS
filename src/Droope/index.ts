import { TDroopeConfig, TData, TSubject } from "./interface";
import DroopeSubject from "./droope.subject";
import ListObserver from "./lisiting.observer";
import DisplayObserver from "./display.observer";

const Droope = (options: TDroopeConfig, data: TData[]): TSubject => {
    const SelectBox = new DroopeSubject(options);
    new ListObserver(SelectBox);
    new DisplayObserver(SelectBox);
    SelectBox.setData({
        hasSelectionUpdated: false,
        hasListUpdated: false,
        construct: true,
        selection: [],
        list: data
    });
    return SelectBox;
};

export default Droope;
