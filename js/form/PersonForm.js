'use strict';

import {BaseForm} from "./BaseForm.js";

export class PersonForm extends BaseForm {

    constructor(defaultData, saveFunction) {
        super(defaultData, saveFunction);
        this.fields = [
            {name: "id", label: 'Id', "type": "hidden"},
            {name: "firstName", label: 'Jméno', "type": "text"},
            {name: "sureName", label: 'Příjmení', "type": "text"},
            {name: "age", label: 'Věk', "type": "text"},
            {name: "phoneNumber", label: 'Telefon', "type": "text"},
        ];
    }
}