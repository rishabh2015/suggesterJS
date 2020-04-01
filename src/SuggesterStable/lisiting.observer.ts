import { TSubject, TObserver, TState } from "./interface";
class Listing implements TObserver {
    private subject: TSubject;
    private hasCheckboxes: boolean | undefined;
    private listId: string;

    constructor(subject: TSubject) {
        this.subject = subject;
        this.subject.registerObserver(this);
        this.hasCheckboxes = this.subject.config.checkboxes;
        this.listId = `${subject.config.domId}List`;
    }

    public generateList(newData: TState): HTMLElement {
        const list: HTMLElement = document.createElement("UL");
        list.id = this.listId;
        try {
            const listLimit: number | undefined = this.subject.config.listLimit;
            let index: number = 1;
            for (const item of newData.list) {
                const liElement: HTMLElement = document.createElement("LI");
                liElement.textContent = item.displayTextEn;
                liElement.classList.add("list-item");
                liElement.setAttribute("data-displayTextEn", item.displayTextEn);
                liElement.setAttribute("data-textsuggest", item.textsuggest ? item.textsuggest : "");
                // if (!item.id) { item.id = index; }
                // liElement.setAttribute("data-id", item.id.toString());
                if (this.hasCheckboxes === true) {
                    liElement.classList.add("check-enabled");
                    this.checkboxDecorator(liElement);
                }
                list.appendChild(liElement);
                if (listLimit && index >= listLimit) {
                    break;
                }
                ++index;
            }
            return list;
        } catch (err) {
            console.warn(err.message);
            return list;
        }
    }

    public checkboxDecorator(liElement: HTMLElement): void {
        try {
            const checkboxItem: HTMLInputElement = document.createElement("input");
            checkboxItem.type = "checkbox";
            checkboxItem.checked = false;
            liElement.appendChild(checkboxItem);
        } catch (err) {
            console.warn(err.message);
        }
    }

    public appendList(list: HTMLElement): void {
        try {
            const { noResultElement } = this.subject;
            const { headingElement } = this.subject;
            const { listingElement } = this.subject.config;
            if (listingElement) {
                listingElement.innerHTML = "";
                listingElement.appendChild(noResultElement);
                listingElement.appendChild(headingElement);
                listingElement.appendChild(list);
            }
        } catch (err) {
            console.warn(err.message);
        }
    }

    // BigO(n)
    public updateTicks(selection: string[]): void {
        try {
            const domList: HTMLElement | null = document.getElementById(this.listId);
            if (domList) {
                const domLiCheckboxElements: NodeListOf<HTMLInputElement> = document.querySelectorAll(".list-item.check-enabled input");

                domLiCheckboxElements.forEach((checkbox) => {
                    checkbox.checked = false;
                });

                selection.forEach((selected) => {
                    const checkedElement: HTMLInputElement | null = domList.querySelector(`[data-displayTextEn="${selected}"] input`);
                    if (checkedElement) {
                        checkedElement.checked = true;
                    }
                });
            }
        } catch (err) {
            console.warn(err.message);
        }
    }

    public update(newData: TState): void {
        try {
            if (newData.hasListUpdated) {
                const list: HTMLElement = this.generateList(newData);
                this.appendList(list);
            } else {
                if (this.hasCheckboxes) {
                    this.updateTicks(newData.selection);
                }
            }
            console.info("[Notified]: Suggester Lisiting Observer");
        } catch (err) {
            console.warn(err.message);
        }
    }
}

export default Listing;
