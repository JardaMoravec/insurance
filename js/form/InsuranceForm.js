'use strict';

import {BaseForm} from "./BaseForm.js";

export class InsuranceForm extends BaseForm {

    constructor(defaultData, saveFunction) {
        super(defaultData, saveFunction);

        const personList = [];
        for (let person of window.persons) {
            personList.push(person.toOption());
        }

        this.fields = [
            {name: "id", label: 'Id', "type": "hidden"},
            {name: "person", label: 'Pojištěnec', "type": "select", "options": personList},
            {name: "name", label: 'Název', "type": "text"},
            {name: "priceLimit", label: 'Maximální jištění', "type": "number"},
            {name: "pricePerMonth", label: 'Měsíční platba', "type": "number"},
            {name: "validFrom", label: 'Datum platnosti od', "type": "date"},
            {name: "validTo", label: 'Datum platnosti do', "type": "date"},
        ];
    }
}