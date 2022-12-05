export class BaseForm {

    constructor(defaultData, saveFunction) {
        this.defaultData = defaultData;
        this.saveFunction = saveFunction;
        this.fields = [];
    }

    create() {
        let form = document.createElement("form");

        for (let field of this.fields) {
            let div = document.createElement("div");
            div.classList.add("formBox");

            let label = document.createElement("label");
            label.innerText = field.label;
            div.appendChild(label);

            let fieldElm = document.createElement("input");
            fieldElm.setAttribute("type", field.type);
            fieldElm.setAttribute("name", field.name);
            if(this.defaultData != null) {
                fieldElm.setAttribute("value", this.defaultData[field.name]);
            }
            div.appendChild(fieldElm);
            form.appendChild(div);
        }

        let button = document.createElement("button");
        button.innerText = "Uložit";

        form.onsubmit = this.saveFunction;
        form.appendChild(button);

        return form;
    }
}