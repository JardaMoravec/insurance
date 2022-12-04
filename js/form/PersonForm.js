import {BaseForm} from "./BaseForm.js";

export class PersonForm extends BaseForm {

    constructor(defaultData) {
        super(defaultData);
        this.fields = [
            {name: "firstName", label: 'Jméno', "type": "text"},
            {name: "sureName", label: 'Příjmení', "type": "text"},
            {name: "age", label: 'Věk', "type": "text"},
            {name: "phoneNumber", label: 'Telefon', "type": "text"},
        ];
    }
}