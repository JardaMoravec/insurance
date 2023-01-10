'use strict';

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

            if (field.type !== "hidden") {
                let label = document.createElement("label");
                label.innerText = field.label;
                label.classList.add("form-label");
                div.appendChild(label);
            }

            let fieldElm;
            if (field.type === "select") {
                if (field.options.length > 0) {
                    fieldElm = document.createElement("select");
                    fieldElm.setAttribute("type", field.type);
                    fieldElm.setAttribute("name", field.name);
                    fieldElm.classList.add("form-select");
                    for (let option of field.options) {
                        let optionElm = document.createElement("option");
                        optionElm.setAttribute("value", option.id);
                        optionElm.innerText = option.label;
                        fieldElm.appendChild(optionElm);
                    }
                    if (this.defaultData != null) {
                        fieldElm.value = this.defaultData[field.name];
                    }

                } else {
                    fieldElm = document.createElement("div");
                    fieldElm.innerText = "Nejdříve vložte nějaké pojištěnce!";
                }
            } else {
                fieldElm = document.createElement("input");
                fieldElm.setAttribute("type", field.type);
                fieldElm.setAttribute("name", field.name);
                fieldElm.classList.add("form-control");
                if (this.defaultData != null) {
                    fieldElm.setAttribute("value", this.defaultData[field.name]);
                }
            }
            div.appendChild(fieldElm);
            form.appendChild(div);
        }

        let button = document.createElement("button");
        button.setAttribute("type", "submit");
        button.innerHTML = `<span class="bi bi-save"></span> Uložit`;
        button.classList.add("btn", "btn-success", "mt-3");

        form.onsubmit = this.saveFunction;
        form.appendChild(button);

        return form;
    }
}