import { TSubject, TObserver, TState } from "./interface";

class SelectDisplay implements TObserver {
    public subject: TSubject;
    private view: HTMLElement;

    constructor(subject: TSubject) {
        this.subject = subject;
        this.subject.registerObserver(this);
        this.view = document.createElement("UL");

        if (this.subject.config.displayBehaviour === "tag") {
            this.onCrossClick();
        }
    }

    public generateDisplayHtml(selectedValues: string[]): HTMLElement {
        try {
            /** @todo: Object vs DOM difffing */
            this.view.innerHTML = "";
            const { displayBehaviour } = this.subject.config;
            selectedValues.forEach((item: string) => {
                const listItem: HTMLElement = document.createElement("LI");
                listItem.textContent = item || "";
                listItem.classList.add("selection-item");
                listItem.setAttribute("data-displayTextEn", JSON.stringify(item));
                switch (displayBehaviour) {
                case "tag":
                    this.tagDecorator(listItem);
                    break;
                }
                this.view.appendChild(listItem);
            });
            return this.view;
        } catch (err) {
            console.warn(err);
            return this.view;
        }
    }

    public appendMarkup(selectedHtml: Element): void {
        try {
            const { displayElement, inputElement } = this.subject.config;
            if (displayElement) {
                displayElement.innerHTML = "";
                displayElement.appendChild(selectedHtml);
            }
            if (inputElement) {
                inputElement.value = "";
            }
        } catch (err) {
            console.warn(err.message);
        }
    }

    public update(state: TState): void {
        try {
            const { selection, hasSelectionUpdated } = state;

            const { displayBehaviour } = this.subject.config;
            if (hasSelectionUpdated === true) {
                switch (displayBehaviour) {
                case "default":
                    this.generateDefaultDisplay(state);
                    break;
                default:
                    this.appendMarkup(this.generateDisplayHtml(selection));
                    break;
                }
                console.info("[Notified]: Suggester Select Observer with UPDATE");
            }
        } catch (err) {
            console.warn(err.message);
        }
    }

    public generateDefaultDisplay(state: TState): void {
        try {
            const { selection, query } = state;
            const selectionLength: number = selection.length;
            const selectionInString: string = selection.join(", ");
            const completeSelectionString: string = selectionLength > 0 ? `${selectionInString}, ` : `${query}, `;
            (this.subject.config.displayElement as HTMLInputElement).value = completeSelectionString;
        } catch (err) {
            console.warn(err.message);
        }
    }

    public tagDecorator(listItem: HTMLElement): HTMLElement {
        try {
            const chipJsonString = listItem.getAttribute("data-obj");
            const chipJSON = chipJsonString ? JSON.parse(chipJsonString) : {};
            const crossIcon: HTMLElement = document.createElement("SPAN");

            crossIcon.textContent = "clear";
            crossIcon.classList.add("material-icons");
            crossIcon.classList.add("list-cross");
            crossIcon.setAttribute("data-id", chipJSON.id);
            listItem.classList.add("tag");
            listItem.appendChild(crossIcon);

            return listItem;
        } catch (err) {
            console.warn(err.message);
            return listItem;
        }
    }

    public onCrossClick(): void {
        try {
            this.view.addEventListener("click", (e: MouseEvent) => {
                if (e.target) {
                    try {
                        const toBeDeletedSelection = (e.target as HTMLElement).getAttribute("data-displayTextEn");
                        if (toBeDeletedSelection && toBeDeletedSelection !== "") {
                            this.subject.removeSelection(toBeDeletedSelection);
                        }
                    } catch (err) {
                        console.warn(err.message);
                    }
                }
            });
        } catch (err) {
            console.warn(err);
        }
    }
}

export default SelectDisplay;
